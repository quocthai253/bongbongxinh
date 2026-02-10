import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key directly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDecorAdvice = async (partyType: string, budget: string, guestCount: string) => {
  try {
    // Call generateContent using the gemini-3-flash-preview model for text-based advice
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tôi đang lên kế hoạch cho một bữa tiệc ${partyType} với ngân sách khoảng ${budget} cho ${guestCount} khách. 
      Hãy tư vấn cho tôi 3 phương án trang trí bong bóng sáng tạo từ thương hiệu 'Bong Bóng Xinh'. 
      Mỗi phương án bao gồm: Tên chủ đề, Mô tả chi tiết các hạng mục trang trí (cổng chào, backdrop, bàn gallery), và Điểm nhấn độc đáo. 
      Trả về kết quả bằng tiếng Việt theo phong cách chuyên nghiệp, tận tâm và sang trọng.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    // Access the text property directly from the GenerateContentResponse object
    return response.text;
  } catch (error) {
    console.error("Error getting decor advice:", error);
    return "Rất tiếc, chuyên gia tư vấn AI đang bận một chút. Quý khách vui lòng liên hệ hotline 0909084174 để được tư vấn trực tiếp ngay lập tức!";
  }
};