import React, { useState } from 'react';
import { AreaCode, Farmer, PurchaseRecord } from '../types';
import { generateAgriInsights } from '../services/geminiService';
import { Bot, Send, Sparkles, Loader2 } from 'lucide-react';

interface AIInsightsProps {
  areas: AreaCode[];
  farmers: Farmer[];
  purchases: PurchaseRecord[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ areas, farmers, purchases }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    
    const result = await generateAgriInsights(prompt, { areas, farmers, purchases });
    setResponse(result);
    setLoading(false);
  };

  const suggestionChips = [
    "Tổng kết sản lượng tháng này?",
    "Vùng nào đang có năng suất thấp nhất?",
    "Dự báo xu hướng giá dựa trên dữ liệu?",
    "Gợi ý tối ưu hóa thu mua?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Trợ Lý AI Nông Nghiệp</h2>
        <p className="text-slate-500">Phân tích dữ liệu, dự báo mùa vụ và tối ưu hóa quy trình với Gemini AI.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
        {/* Chat History / Response Area */}
        <div className="flex-1 p-6 bg-slate-50 overflow-y-auto">
          {!response && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
              <Bot className="w-16 h-16 mb-4" />
              <p>Hãy đặt câu hỏi về dữ liệu của bạn...</p>
            </div>
          )}

          {loading && (
             <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                    <p className="text-sm font-medium text-slate-600">Gemini đang phân tích dữ liệu...</p>
                </div>
             </div>
          )}

          {response && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 animate-in fade-in duration-500">
               <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                    <Bot className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-slate-800">Phân tích từ AI</span>
               </div>
               <div className="prose prose-indigo max-w-none text-slate-700 whitespace-pre-wrap font-sans">
                  {response}
               </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
           {/* Suggestions */}
           {!response && !loading && (
             <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {suggestionChips.map((chip, idx) => (
                    <button
                        key={idx}
                        onClick={() => setPrompt(chip)}
                        className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                    >
                        {chip}
                    </button>
                ))}
             </div>
           )}
           
           <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Nhập câu hỏi của bạn (ví dụ: So sánh năng suất các vùng...)"
                className="flex-1 py-3 pl-4 pr-12 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                disabled={loading}
              />
              <button 
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
           </div>
           <p className="text-center text-xs text-slate-400 mt-3">
             AI có thể mắc sai sót. Vui lòng kiểm tra lại thông tin quan trọng.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;