import { handlers } from "@/auth";

export const GET = (request) => {
  console.log("Auth GET request:", request.method, request.url);
  return handlers.GET(request);
};

export const POST = (request) => {
  console.log("Auth POST request:", request.method, request.url);
  return handlers.POST(request);
};
