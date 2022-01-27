import React from 'react';
import Meta from '../components/Meta';

const AboutScreen = () => {
  return (
     
    <div className='text-center'>
      <Meta title='О нас' />
      <div >
        
        <div className='nameText'>
          Контакты
        </div>

        <div >
          <p>Телефон (WhatsUp)<br />053 6120636<br />Адрес<br />г. Нагария, ул.Вайцман, 70a<br />/ רחיי ווצמן 70א
            ,נהרייה /
          </p>

          <p >Часы работы<br />Пн-Сб: 13.00-22.00<br />Вс-выходной<br />Доставка по городу-15 שח <br />Пн-Сб:
            13.00-20.00</p>
        </div>

        <div className='pageMap'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d860.9912510936648!2d35.09229748304325!3d33.00583107267222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dce57bf73d821%3A0x749c592831f84f81!2sWeizman%2070%2C%20Nahariya!5e0!3m2!1sru!2sil!4v1637428894712!5m2!1sru!2sil"
            style={{border:0}} allowFullScreen="" loading="lazy">
          </iframe>
        </div>

      </div>

    </div>
  )
}

export default AboutScreen
