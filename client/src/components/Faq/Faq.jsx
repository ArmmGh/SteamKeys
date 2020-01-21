import React, { useEffect, useState } from 'react';
import guarant from '../../assets/faq/guarant.svg';
import thumb from '../../assets/faq/thumb.png';

import './Faq.scss';

const Footer = () => {
  const [questions, setQuestions] = useState([
    {
      id: 0,
      text: 'Как начать пользоваться сайтом?',
      answer:
        'Авторизуйтесь удобным для Вас способом (Steam, VK).Пополняйте баланс и делайте свой первый вклад.',
      collapsed: false,
    },
    {
      id: 1,
      text: 'Как пополнить Баланс?',
      answer:
        'Для этого необходимо авторизоваться. Далее нажимаем на "+" в правом верхнем углу (возле аватарки), или в профиле нажимаем "Пополнить".Выбираем сумма и способ и следуем по инструкциям',
      collapsed: false,
    },
    {
      id: 2,
      text: 'Не пришли деньги на баланс, что делать?',
      answer:
        'Обычно средства приходят моментально, но в некоторых случаях требуется подождать 3-5 минут и средства будут начислены. Если средства не пришли по истечению этого времени, напишите в тех. поддержку, Вам обязательно помогут.',
      collapsed: false,
    },
    {
      id: 3,
      text: 'Я вкладил, куда мне придет деньги?',
      answer:
        'Все вклады находятся в профиле на сайте. После того, как 24 час прошёл, зайдите в свой профиль и выберите дальнейшее действие,получить вырученные средства на свой баланс.',
      collapsed: false,
    },
    {
      id: 4,
      text: 'Как получить деньги?',
      answer: [
        { text: '1. Откройте профиль' },
        { text: '2. Откройте <<ввывести>>' },
        { text: '3. Напишите сумму которое вы хотите ввывести о нажимайте кнопку PAYEER' },
        { text: '4. Нажать получить' },
      ],
      collapsed: false,
    },
  ]);

  const collapse = i => e =>
    setQuestions(
      questions.map(item =>
        item.id === i ? { ...item, collapsed: !item.collapsed } : item,
      ),
    );

  useEffect(() => {}, []);

  return (
    <div className="faqHolder">
      <div className="main-width">
        <div className="guarant">
          <div className="item">
            <div className="pic">
              <img src={thumb} alt="thumb" />
            </div>
            <h1 className="title">Честно</h1>
            <div className="text">
              У нас нет проигравших! Каждый получит свои деньги. Самое главное, это возможность получить
              деньги за просто. В LIVE-ленте отображаются полученные
              бонусы,в таблице вклады, реальными клиентами!
            </div>
          </div>
          <div className="item">
            <div className="pic">
              <img src={guarant} alt="guarant" />
            </div>
            <h1 className="title">Надежно</h1>
            <div className="text">
              Мы гарантируем что вы получите свои деньги. Если
              возникнут проблемы наша тех. поддержка с удовольствием вас помогут
            </div>
          </div>
        </div>
        <div className="qa">
          <h1>Вопросы и Ответы</h1>
          {questions.map((item, i) => (
            <div
              key={i}
              className={`item ${item.collapsed ? 'collapsed' : ''}`}
            >
              <div className="question">
                <div className="title">Вопрос {i + 1}:</div>
                <div className="text">{item.text}</div>
                <div className="action">
                  <button className="btn" onClick={collapse(i)}>
                    {item.collapsed ? 'Скрыть ответ' : 'Посмотрет ответ'}
                  </button>
                </div>
              </div>
              <div
                className={`answer ${item.collapsed ? 'animated fadeIn' : ''}`}
              >
                {typeof item.answer === 'string'
                  ? item.answer
                  : item.answer.map((item, i) => (
                      <React.Fragment key={i}>
                        {(item.title && <h1>{item.title}</h1>) ||
                          (item.text && <p>{item.text}</p>)}
                      </React.Fragment>
                    ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
