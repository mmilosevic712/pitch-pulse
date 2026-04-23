import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https:\/\/([a-z0-9-]+\.)*lovable\.app$/,
  /^https:\/\/([a-z0-9-]+\.)*lovableproject\.com$/,
  /^https:\/\/([a-z0-9-]+\.)*lovable\.dev$/,
];

function buildCorsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin && ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin))
      ? origin
      : "null";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));

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
      console.error("NewsData API error", response.status, data);
      return new Response(
        JSON.stringify({ error: "Failed to fetch news. Please try again." }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error fetching football news:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch news. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
