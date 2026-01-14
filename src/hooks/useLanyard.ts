import { useState, useEffect } from "react";
import { DiscordUser, Activity } from "../types";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

export const useLanyard = () => {
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!DISCORD_ID) {
      setError("Discord ID bulunamadı. Lütfen .env dosyasında VITE_DISCORD_ID değişkenini ayarlayın.");
      setLoading(false);
      return;
    }
    const fetchBannerFromDiscordLookup = async () => {
      try {
        const response = await fetch(
          `https://discordlookup.mesalytic.moe/v1/user/${DISCORD_ID}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch banner from discordlookup: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("DiscordLookup API response (banner):", data);

        return data.banner?.link || null;
      } catch (err) {
        console.error("Error fetching DiscordLookup banner:", err);
        return null;
      }
    };

    const fetchLanyardData = async () => {
      try {
        const [lanyardResponse, bannerUrl] = await Promise.all([
          fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`),
          fetchBannerFromDiscordLookup(),
        ]);

        if (!lanyardResponse.ok) {
          throw new Error(
            `Failed to fetch Discord data from Lanyard: ${lanyardResponse.statusText}`
          );
        }

        const lanyardData = await lanyardResponse.json();
        console.log("Lanyard API response:", lanyardData);

        if (lanyardData.success) {
          const user = lanyardData.data.discord_user;
          setDiscordUser({
            username: user.username || "Bilinmeyen Kullanıcı",
            id: user.id,
            avatar: user.avatar || null,
            banner_url: bannerUrl, 
            about:
              lanyardData.data.activities?.find((a: any) => a.type === 4)?.state ||
              null,
            status: lanyardData.data.discord_status || "offline",
            activities:
              lanyardData.data.activities?.map((activity: any) => ({
                type: activity.type,
                name: activity.name,
                details: activity.details || null,
                state: activity.state || null,
                timestamps: activity.timestamps || null,
                assets: activity.assets || null,
              })) || [],
            badges: ['nitro', 'active_developer', 'verified_developer'], 
          });
        } else {
          throw new Error("Lanyard API returned unsuccessful response");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching Lanyard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanyardData();

    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    let heartbeatInterval: NodeJS.Timeout | null = null;

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_ids: [DISCORD_ID],
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message:", data);

      if (data.op === 1) {
        const interval = data.d.heartbeat_interval;
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        heartbeatInterval = setInterval(() => {
          ws.send(
            JSON.stringify({
              op: 3,
            })
          );
        }, interval);
      }

      if (
        data.op === 0 &&
        data.t === "PRESENCE_UPDATE" &&
        data.d.user_id === DISCORD_ID
      ) {
        const user = data.d.discord_user;
        setDiscordUser((prev) => ({
          username: user.username || prev?.username || "Bilinmeyen Kullanıcı",
          id: user.id || prev?.id,
          avatar: user.avatar || prev?.avatar || null,
          banner_url: prev?.banner_url || null, 
          about:
            data.d.activities?.find((a: any) => a.type === 4)?.state || prev?.about || null,
          status: data.d.discord_status || "offline",
          activities:
            data.d.activities?.map((activity: any) => ({
              type: activity.type,
              name: activity.name,
              details: activity.details || null,
              state: activity.state || null,
              timestamps: activity.timestamps || null,
              assets: activity.assets || null,
            })) || [],
          badges: prev?.badges || ['nitro', 'active_developer', 'verified_developer'],
        }));
      }
    };

    ws.onerror = (err) => {
      setError("WebSocket connection error");
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      setError("WebSocket connection closed");
      console.log("WebSocket closed");
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    };

    return () => {
      console.log("Cleaning up WebSocket");
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      ws.close();
    };
  }, []);

  return { discordUser, loading, error };
};