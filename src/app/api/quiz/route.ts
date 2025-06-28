import { NextResponse } from 'next/server';

export async function POST(request: Request){
  const {searchParams} = new URL(request.url)
  const language = searchParams.get('language') || 'english'
  const level = searchParams.get('level') || 'beginner'

  const prompt = `
  以下の条件に合った英単語または外国語単語の4択クイズを20問作成してください。

  - 言語: ${language}
  - レベル: ${level}
  - 出力形式: JSON。構造は以下の通りです:

  [
  {
    "word": "単語",
    "meaning": "意味（日本語）",
    "options": ["正解", "選択肢2", "選択肢3", "選択肢4"],
    "correct": "正解"
  },
  .....
]


  - 注意点: 
    - 単語はレベルに応じたものを選ぶこと
    - 選択肢はランダムに並べること
    - 正解の単語と意味は必ず含めること
  `
    
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    })

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
  console.error('faild getiing content', data)
  return NextResponse.json(
    { error: 'could not get conntent', raw: data },
    { status: 500 }
  )
}

  
    const cleanContent = content.replace(/```json|```/g, '').trim()

    const quiz = JSON.parse(cleanContent)
    return NextResponse.json(quiz)
  } catch (err){
    console.log(err)
    return NextResponse.json({
      error: 'Failed to generate quiz'
    }, {status: 500})
  }
}

