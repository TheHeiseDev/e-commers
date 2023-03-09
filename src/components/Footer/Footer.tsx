import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer__wrapper">
        <div className="footer__item">
          <p>Клиентам</p>
          <ul>
            <li>Столплит Клуб</li>
            <li>Использование купонов и бонусов</li>
            <li>Подарочные карты</li>
            <li>Обратная связь</li>
            <li>Кредитный калькулятор</li>
            <li>Советы по выбору мебели</li>
          </ul>
        </div>
        <div className="footer__item">
          <p>Сервис</p>
          <ul>
            <li>Дизайнер на дом</li>
            <li>Кухня на заказ</li>
            <li>Профессиональный замер</li>
            <li>Доставка и подъем</li>
            <li>Самовывоз</li>
            <li>Оплата</li>
          </ul>
        </div>
        <div className="footer__item">
          <p>Компания</p>
          <ul>
            <li>Скачать каталог</li>
            <li>Новости</li>
            <li>Вакансии</li>
            <li>Карта сайта</li>
            <li>Контакты</li>
            <li>Франшиза</li>
          </ul>
        </div>
      </div>
      <div className="footer__contact">
        <span>Город и Область</span>
        <div>
          <span className="info">Единая справочная 09:00 - 19:00</span>
          <a href="tel:+84990000000" className="tell">
            8 (499) 000-00-00
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
