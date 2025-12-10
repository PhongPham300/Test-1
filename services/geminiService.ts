import { GoogleGenAI } from "@google/genai";
import { AreaCode, Farmer, PurchaseRecord } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize the client only if the key is available to avoid immediate errors on load if missing
const getAiClient = () => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const generateAgriInsights = async (
  prompt: string,
  contextData: { areas: AreaCode[]; farmers: Farmer[]; purchases: PurchaseRecord[] }
): Promise<string> => {
  const client = getAiClient();
  if (!client) return "Vui lòng cấu hình API Key để sử dụng tính năng AI.";

  const contextString = JSON.stringify({
    summary: "Dữ liệu nông nghiệp của Hoa Cương",
    stats: {
      totalAreas: contextData.areas.length,
      totalFarmers: contextData.farmers.length,
      totalPurchases: contextData.purchases.length,
      totalVolume: contextData.purchases.reduce((acc, p) => acc + p.weight, 0),
    },
    sampleData: {
      areas: contextData.areas.slice(0, 5),
      farmers: contextData.farmers.slice(0, 5),
      recentPurchases: contextData.purchases.slice(0, 10),
    }
  });

  const fullPrompt = `
    Bạn là một chuyên gia phân tích dữ liệu nông nghiệp cho hệ thống "Hoa Cương".
    Dưới đây là dữ liệu hiện tại của hệ thống (được tóm tắt dưới dạng JSON):
    ${contextString}

    Hãy trả lời câu hỏi hoặc yêu cầu sau của người dùng một cách ngắn gọn, chuyên nghiệp và hữu ích. 
    Tập trung vào các xu hướng, hiệu quả năng suất, hoặc gợi ý kinh doanh.
    Định dạng câu trả lời bằng Markdown.

    Câu hỏi của người dùng: "${prompt}"
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    return response.text || "Không thể tạo phân tích vào lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.";
  }
};
