// /* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import RuStrings from 'react-timeago/lib/language-strings/ru';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { FaUser, FaUsers, FaRegFolderOpen } from 'react-icons/fa';
import fetchApi from '../../utils/fetchApi';
import img1 from '../../assets/profile/donald.gif';
import './Livedrop.scss';
import { useStateValue } from '../../context';

const formatter = buildFormatter(
  window.localStorage.getItem('lang') === 'en' ? RuStrings : RuStrings,
);

const Livedrop = () => {
  const [{ socket, translate }] = useStateValue();
  const [livedrop, setLivedrop] = useState([]);
  const [totalUsers, setTotalusers] = useState(0);
  const [openCases, setOpencases] = useState(0);
  const [onlineUsers, setOnlineusers] = useState(0);

  function importAll(r) {
    const images = {};
    // eslint-disable-next-line array-callback-return
    r.keys().map(item => {
      images[item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = r(
        item,
      );
    });
    return images;
  }

  const images = importAll(
    require.context('../../assets/profile', false, /\.(png|jpe?g|svg)$/),
  );
  const imagesCases = importAll(
    require.context('../../assets/cases', false, /\.(png|jpe?g|svg)$/),
  );

  useEffect(() => {
    socket.emit('emit getlive');
    socket.on('get live', payload => {
      setLivedrop([...payload]);
    });

    fetchApi('/liveinfo').then(res => {
      setTotalusers(res.users);
      setOpencases(res.cases);
    });

    return () => {};
  }, []);

  useEffect(() => {
    socket.on('update live', payload => {
      if (payload.type !== 'xujan' && livedrop.length >= 10) {
        if (document.getElementById('helper')) {
          document.getElementById('helper').remove();
        }
        const elems = document.querySelectorAll('ul#list li');
        let lastElem;
        if (window.innerWidth >= 1616) {
          lastElem = elems[9];
        } else if (window.innerWidth >= 1456) {
          lastElem = elems[8];
        } else if (window.innerWidth >= 1296) {
          lastElem = elems[7];
        } else if (window.innerWidth >= 1136) {
          lastElem = elems[6];
        } else if (window.innerWidth >= 976) {
          lastElem = elems[5];
        } else if (window.innerWidth >= 816) {
          lastElem = elems[4];
        } else if (window.innerWidth >= 656) {
          lastElem = elems[3];
        } else if (window.innerWidth >= 486) {
          lastElem = elems[2];
        } else if (window.innerWidth >= 326) {
          lastElem = elems[1];
        } else {
          lastElem = elems[0];
        }
        const firstElem = elems[0];
        const newElem = document.createElement('div');
        window.addEventListener('resize', () => {
          newElem.remove();
        });
        newElem.setAttribute('id', 'helper');
        newElem.classList.add('animated', 'helper');
        lastElem.classList.add('animated', 'fadeOutDown', 'hideElem');
        if (window.innerWidth < 1616) {
          lastElem.after(newElem);
        }
        lastElem.addEventListener('animationend', () => {
          firstElem.classList.add('animated', 'flipInX', 'showElem');
          newElem.classList.add('mainWidth', 'animated', 'widthDown');
          firstElem.addEventListener('animationend', () => {
            firstElem.classList.remove('animated', 'flipInX', 'showElem');
            newElem.remove();
          });
          lastElem.classList.remove('animated', 'fadeOutDown', 'hideElem');
          livedrop.pop();
          setLivedrop([payload, ...livedrop]);
        });
      }
    });

    return () => {};
  }, [livedrop]);

  useEffect(() => {
    socket.on('userCount', data => {
      setOnlineusers(data.userCount);
    });
    return () => {};
  }, [onlineUsers]);

  return (
    <React.Fragment>
      <div className="infocont">
          <div className="infomain">
            <div className="stats">
              <h1>Пользовательей</h1>
              <span>1500</span>
              <h1>Онлайн</h1>
              <span>500</span>
            </div>
            <div className="slidi">
            <Carousel
            autoPlay={true}
            interval={10000}
            width="100%"
            showIndicators={false}
            showStatus={false}
            showArrows={false}
            showThumbs={false}
            infiniteLoop
            >
                <div className="imge">
                <div className="content">Выложу сумму и получи вклад + 20% от вклада через 24 часа</div>
                </div>
                <div>
                <img src={img1} />
                </div>
            </Carousel>
            </div>
            <div className="stats">
            <h1>Вкладов</h1>
              <span>1500</span>
              <h1>Резерв</h1>
              <span>500</span>
            </div>
          </div>
        </div>
    </React.Fragment>
 );
};

export default Livedrop;
