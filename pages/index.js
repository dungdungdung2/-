import { useState } from 'react';
import Head from 'next/head';
export default function WaterQuiz() {
  const [stage, setStage] = useState(0);
  const [userPath, setUserPath] = useState('consumer');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const consumerQuizFlow = [
    {
      question: "분식점을 운영하거나 관련 일을 하시나요?",
      options: ["네", "아니오"],
      handler: (answer) => {
        setUserPath(answer === "네" ? "professional" : "consumer");
      }
    },
    {
      question: "평소 분식류를 얼마나 자주 드시나요?",
      options: ["주 1-2회", "주 3회 이상", "거의 매일", "가끔"],
      handler: (answer) => {
        if (answer === "가끔") setShowGame(true);
      }
    },
    {
      question: "가장 좋아하는 분식 메뉴는?",
      options: ["떡볶이", "김밥", "우동", "기타"],
      handler: () => {}
    },
    {
      question: "음식의 맛에 얼마나 민감하신가요?",
      options: ["매우 민감", "보통", "크게 신경쓰지 않음"],
      handler: (answer) => {
        if (answer === "크게 신경쓰지 않음") setShowGame(true);
      }
    },
    {
      question: "물 맛이 완전히 다른 특별한 물이 음식 맛에 영향을 준다는 생각을 해본 적 있나요?",
      options: ["매우 그렇다", "어느 정도", "처음 들어봅니다"],
      handler: (answer) => {
        if (answer === "처음 들어봅니다") setShowGame(true);
      }
    },
    {
      question: "현재 사용하시는 물로 만든 음식 맛에 만족하시나요?",
      options: ["매우 만족", "보통", "더 좋은 물을 찾고 있음"],
      handler: () => {}
    },
    {
      question: "물 맛을 전문적으로 평가하는 워터 소믈리에 연구원 소속 회사의 정수기 물로 분식 맛을 다르게 만드는 것에 관심이 있나요?",
      options: ["매우 관심있음", "궁금함", "아니오"],
      handler: () => setShowEmailForm(true)
    }
  ];

  const professionalQuizFlow = [
    {
      question: "분식점을 운영하거나 관련 일을 하시나요?",
      options: ["네", "아니오"],
      handler: (answer) => {
        setUserPath(answer === "네" ? "professional" : "consumer");
      }
    },
    {
      question: "음식의 품질 관리에 얼마나 신경쓰시나요?",
      options: ["매우 많이", "보통", "크게 신경쓰지 않음"],
      handler: (answer) => {
        if (answer === "크게 신경쓰지 않음") setShowGame(true);
      }
    },
    {
      question: "가장 신경쓰는 메뉴는?",
      options: ["떡볶이", "김밥", "우동", "기타"],
      handler: () => {}
    },
    {
      question: "물 맛의 차이가 음식 맛의 완성도를 좌우한다는 사실을 알고 계신가요?",
      options: ["알고 있음", "어느 정도", "처음 들음"],
      handler: (answer) => {
        if (answer === "처음 들음") setShowGame(true);
      }
    },
    {
      question: "현재 사용 중인 물로 만든 음식 맛에 완전히 만족하시나요?",
      options: ["매우 만족", "보통", "더 나은 물을 찾는 중"],
      handler: () => {}
    },
    {
      question: "물 때문에 음식 맛이 기대에 못 미친 경험이 있으신가요?",
      options: ["자주 있음", "가끔", "없음"],
      handler: () => {}
    },
    {
      question: "워터 소믈리에 연구원들이 발견한 물 맛의 차이로 음식 맛을 더 특별하게 만드는 방법을 알고 싶으신가요?",
      options: ["매우 관심있음", "궁금함", "아니오"],
      handler: () => setShowEmailForm(true)
    }
  ];

  const SimpleGame = () => {
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);
    
    const waterOptions = [
      { id: 1, name: '일반 수돗물', icon: '🚰', isSpecial: false },
      { id: 2, name: '깨끗한 생수', icon: '💧', isSpecial: false },
      { id: 3, name: '특별한 물', icon: '✨💧', isSpecial: true },
      { id: 4, name: '일반 정수기 물', icon: '🥤', isSpecial: false }
    ];

    return (
      <div className="p-4 bg-blue-50 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2">특별한 물 찾기 게임</h3>
        <p className="text-sm text-gray-600 mb-4">
          음식 맛을 특별하게 만들어주는 물을 찾아보세요!
        </p>
        
        {!showResult ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {waterOptions.map(water => (
                <div 
                  key={water.id}
                  onClick={() => setSelected(water)}
                  className={`p-4 bg-white rounded-lg cursor-pointer transition ${
                    selected?.id === water.id ? 'border-2 border-blue-500' : 'border'
                  } hover:bg-blue-100`}
                >
                  <div className="text-3xl mb-2">{water.icon}</div>
                  <div className="text-sm">{water.name}</div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowResult(true)}
              disabled={!selected}
              className={`w-full p-3 rounded transition ${
                selected 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-200 cursor-not-allowed'
              }`}
            >
              선택 완료
            </button>
          </>
        ) : (
          <div className="text-center">
            {selected.isSpecial ? (
              <div className="mb-4">
                <div className="text-2xl mb-2">🎉 정답입니다! 🎉</div>
                <p className="text-sm text-gray-600">
                  특별한 물이 음식의 맛을 더욱 특별하게 만들어줍니다.
                </p>
              </div>
            ) : (
              <div className="mb-4">
                <div className="text-xl mb-2">💡 다시 한번 생각해보세요!</div>
                <p className="text-sm text-gray-600">
                  더 특별한 물이 있을 것 같지 않나요?
                </p>
              </div>
            )}
            
            <button
              onClick={() => {
                if (selected.isSpecial) {
                  setShowGame(false);
                  setStage(prev => prev + 1);
                } else {
                  setSelected(null);
                  setShowResult(false);
                }
              }}
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {selected.isSpecial ? '퀴즈 계속하기' : '다시 선택하기'}
            </button>
          </div>
        )}
      </div>
    );
  };

  const EmailCollectForm = () => (
    <div className="p-4 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">특별한 물의 비밀을 알고 싶으신가요?</h3>
      <p className="text-sm text-gray-600 mb-4">
        이메일을 남겨주시면 워터 소믈리에 연구원들이 발견한 특별한 정보를 보내드립니다.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력해주세요"
        className="w-full p-2 border rounded mb-4"
      />
      <button 
        onClick={() => {
          alert('감사합니다! 곧 연락드리겠습니다.');
          setShowEmailForm(false);
        }}
        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        정보 받아보기
      </button>
    </div>
  );

  if (showGame) {
    return <SimpleGame />;
  }

  if (showEmailForm) {
    return <EmailCollectForm />;
  }

  const currentFlow = userPath === "professional" ? professionalQuizFlow : consumerQuizFlow;

  if (stage >= currentFlow.length) {
    return <EmailCollectForm />;
  }

  const currentQuestion = currentFlow[stage];

 return (
    <>
      <Head>
        <title>물 맛 퀴즈</title>
        <meta name="description" content="특별한 물 맛 찾기 퀴즈" />
      </Head>
      <div className="w-full max-w-4xl p-4">
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${((stage + 1) / currentFlow.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">{currentQuestion.question}</h2>
        
        <div className="space-y-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => {
                currentQuestion.handler(option);
                if (!showGame) {
                  setStage(prev => prev + 1);
                }
              }}
              className="w-full p-3 text-left border rounded hover:bg-gray-50 transition"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
