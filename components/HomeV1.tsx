import HeroV2 from "@/V2/HeroV2/HeroV2";
import HowItWorksV2 from "@/V2/HowItWorksV2/HowItWorksV2";
import Explain from "@/views/Explain/Explain";
import { Footer } from "@/V2/Footer/Footer";
import Hero from "@/views/Hero/Hero";
import WhoAreWe from "@/views/WhoAreWe/WhoAreWe";

const TestimonialsSection = ({ locale }: { locale: string }) => {
  const testimonials = [
    {
      name: locale === "he" ? "שרה" : "Sarah",
      role: locale === "he" ? "אוהבת בישול" : "Food Enthusiast",
      text: locale === "he" 
        ? "המתכונים המותאמים שלי עזרו לי להשיג את יעדיי התזונתיים בקלות!"
        : "The personalized recipes helped me reach my nutrition goals easily!",
      emoji: "👩‍🍳"
    },
    {
      name: locale === "he" ? "דוד" : "David",
      role: locale === "he" ? "כושר" : "Fitness Coach",
      text: locale === "he"
        ? "הדיוק התזונתי של AI הוא מדהים. המתכונים שלי מכילים בדיוק את מה שאני צריך."
        : "The AI's nutritional accuracy is amazing. Every recipe is spot-on!",
      emoji: "💪"
    },
    {
      name: locale === "he" ? "רחל" : "Rachel",
      role: locale === "he" ? "אימא עסוקה" : "Busy Mom",
      text: locale === "he"
        ? "יצירת מתכונים בדקה אחת? זה משנה חיים עבורי וההדום שלי!"
        : "Creating recipes in one minute? Game-changer for my family!",
      emoji: "🏡"
    },
  ];

  return (
    <section className="py-16 md:py-24  overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            {locale === "he" ? "מה משתמשים אומרים" : "What Users Say"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              <style>{`
                @keyframes slideInUp {
                  from {
                    opacity: 0;
                    transform: translateY(30px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                
                @keyframes float {
                  0%, 100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-10px);
                  }
                }
                
                .float-emoji {
                  animation: float 3s ease-in-out infinite;
                }
              `}</style>
              
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              
              <div className="relative bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl float-emoji">{testimonial.emoji}</div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-orange-400"
                style={{
                  animation: `pulse 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </section>
  );
};

export default function HomeV1({ locale }: { locale: string }) {
  return (
    <div>
      <HeroV2 />
      <HowItWorksV2 />
      <TestimonialsSection locale={locale} />
      <Footer />
    </div>
  );
}
