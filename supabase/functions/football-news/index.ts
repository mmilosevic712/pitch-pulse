import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("NEWSDATA_API_KEY");
    if (!apiKey) {
      throw new Error("NEWSDATA_API_KEY is not configured");
    }

    const url = new URL("https://newsdata.io/api/1/latest");
    url.searchParams.set("apikey", apiKey);
    url.searchParams.set(
      "q",
      '(football OR soccer) AND (transfer OR "Premier League" OR "Champions League")'
    );
    url.searchParams.set("country", "gb,us,it,fr,de");
    url.searchParams.set("language", "en");
    url.searchParams.set("category", "sports");
    url.searchParams.set("image", "1");
    url.searchParams.set("removeduplicate", "1");
    url.searchParams.set("sort", "relevancy");
    url.searchParams.set("size", "10");

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `NewsData API error [${response.status}]: ${JSON.stringify(data)}`
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error fetching football news:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
