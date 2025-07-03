"use client"
import React, { useState } from 'react';

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "田中 美咲",
      role: "大学生",
      content: "AIが私の弱点を見つけて、効率的に学習できるようになりました。TOEIC 800点突破！",
      rating: 5
    },
    {
      name: "佐藤 健一",
      role: "会社員",
      content: "忙しい中でも短時間で効果的に語彙力を伸ばせました。ドイツ語検定B2合格できました！",
      rating: 5
    },
    {
      name: "山田 花子",
      role: "主婦",
      content: "子育ての合間にスマホで学習。3ヶ月で英会話に自信が持てるようになりました。",
      rating: 5
    }
  ];

  const features = [
    {
      icon: "🤖",
      title: "AI個別最適化",
      description: "あなたの学習パターンを分析し、最適な問題を出題"
    },
    {
      icon: "⚡",
      title: "高速学習",
      description: "従来の3倍速で語彙力向上を実現"
    },
    {
      icon: "📱",
      title: "いつでもどこでも",
      description: "スマホ・PC・タブレット対応でスキマ時間活用"
    },
    {
      icon: "📊",
      title: "詳細分析",
      description: "学習進捗と弱点を可視化してモチベーション維持"
    },
    {
      icon: "🌍",
      title: "多言語対応",
      description: "英語・ドイツ語・スペイン語など幅広い言語"
    },
    {
      icon: "🎯",
      title: "レベル別学習",
      description: "A1からC2まで、あなたのレベルに合わせた学習"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              <span className="text-sm font-medium">🎉 新機能リリース記念 - 今なら無料体験延長中！</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                AI
              </span>
              <span className="block mt-2">語彙学習革命</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              最先端のAI技術があなた専用の学習プランを作成。
              <br />
              効率的に語彙力を向上させ、語学の目標を達成しましょう。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transform transition-all duration-300 text-lg">
                🚀 無料で始める
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 text-lg">
                📹 デモを見る
              </button>
            </div>
            
            <div className="pt-8 text-sm text-blue-200">
              ✨ クレジットカード不要 ・  🔒 安全・安心
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce delay-300">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">📚</span>
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-700">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">🧠</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">50,000+</div>
              <div className="text-gray-600">アクティブユーザー</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">学習継続率</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-indigo-600">3倍</div>
              <div className="text-gray-600">学習効率向上</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">12言語</div>
              <div className="text-gray-600">対応言語数</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              なぜAI Word Quizが選ばれるのか
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              最新のAI技術と学習科学を組み合わせ、あなたに最適化された学習体験を提供します
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3ステップで始める
            </h2>
            <p className="text-xl text-gray-600">
              簡単な設定で、今すぐAI学習を体験できます
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "レベル診断",
                description: "簡単なテストであなたの現在のレベルを診断",
                icon: "🎯"
              },
              {
                step: "02",
                title: "AI学習開始",
                description: "AIがあなた専用の学習プランを自動生成",
                icon: "🤖"
              },
              {
                step: "03",
                title: "継続的改善",
                description: "学習データを分析し、常に最適化を実行",
                icon: "📈"
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl shadow-xl">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-blue-600 shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ユーザーの声
            </h2>
            <p className="text-xl text-gray-600">
              実際に成果を上げた方々からの評価
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="space-y-2">
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            今すぐ語彙学習を
            <span className="block">革命的に変えよう</span>
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            14日間の無料体験で、AIの力を実感してください
          </p>
          <button className="px-12 py-4 bg-white text-blue-600 font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transform transition-all duration-300">
            🚀 無料体験を始める
          </button>
          <p className="text-sm text-blue-200 mt-4">
            無料体験後も月額料金なし・追加課金なし
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🤖</span>
                <span className="text-xl font-bold">AI Word Quiz</span>
              </div>
              <p className="text-gray-400">
                AIを使った革新的な語彙学習プラットフォーム
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">プロダクト</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">機能一覧</a></li>
                <li><a href="#" className="hover:text-white transition-colors">料金プラン</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">サポート</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">ヘルプセンター</a></li>
                <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">コミュニティ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">会社情報</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">私たちについて</a></li>
                <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Word Quiz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}