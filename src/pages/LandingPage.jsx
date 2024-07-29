import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import stylesheet for custom styling

function LandingPage() {
  const [showMoreButtons, setShowMoreButtons] = useState(false);

  const handleMoreClick = () => {
    setShowMoreButtons(!showMoreButtons);
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          {/* Ganti dengan nama aplikasi kamu */}
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <div className="banner-container">
          <img src="img/banner.png" alt="Quiz App" className="landing-page-image" />
          <h1>🔔 Waktu Bermain Anda Telah Habis, </h1>
          <h2> Silahkan Masuk Ke Ruang Kelas Anda masing-masing </h2>
          <div className="button-container">
            <Link to="/sd" className="btn">📚Ruang Kelas SD</Link>
            <Link to="/smp" className="btn">👩‍🏫Ruang Kelas SMP</Link>
            <Link to="/sma" className="btn">🏫 Ruang Kelas SMA</Link>
            <button className="btn" onClick={handleMoreClick}>
              {showMoreButtons ? '📝Lainnya' : '📝Lainnya'}
            </button>
            {showMoreButtons && (
              <div className="more-buttons">
                <Link to="/extra1" className="btn">💻Laboratorium Komputer</Link>
                <Link to="/extra2" className="btn">🎵Ruang Kesenian</Link>
                <Link to="/extra3" className="btn">👩🏻‍⚕️Ruang BK</Link>
                <Link to="/extra3" className="btn">👩🏻‍💼Tata Usaha</Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <div className="box">
        <div alt="Descriptive text" className="box-image" />
        <h1>Anda Merasa Malas Saat Belajar?</h1>
        <h2>Mungkin Lingkungan Belajar Kamu Yang Membuat Kamu Tidak Nyaman</h2>
      </div>
      <img src="img/semangat.png" alt="Learning Environment" className="learning-environment-image" />
      <div className="kotak">
      ⭐ Ayo Tingkatkan Belajar-mu! Dengan Langganan Paket Belajar Dibawah ini!
      </div>
      <div className="kotaka">
      ⭐ Kamu Akan Mendapatkan Teman dan Mentor Yang Support Kamu!
      </div>
      <div className="kotakb">
      🏆Pilih Paket Belajar Sang Juara Lomba
      <br />
      <span className="small-text">Anda Hari Ini Ingin Belajar Apa?</span>
  <div className="dropdown">
  <div className="mtk">Matematika</div>
  <div className="dropdown-content">
    <div className="mtk-item">IPA</div>
    <div className="mtk-item">IPS</div>
    <div className="mtk-item">PKN</div>
    <div className="mtk-item">Bahasa Indonesia</div>
    <div className="mtk-item">Bahasa Inggris</div>
  </div>
  </div>
  <div className="paketa">
  <img src="img/paketa.png" alt="PaketA" className="paket-a" />
  <div className="ket">
  <br />
  &nbsp; ⭐ Pengguna mendapatkan materi berupa pembacaan &nbsp; &nbsp; &nbsp; &nbsp; artikel dan video pembelajaran dan juga kuis
  <br />
  <br />
  &nbsp; ⭐ Materi yang di dapatkan setiap minggu berubah-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ubah
  <br />
  <br />
  &nbsp; ⭐ Paket ini terdiri dari mata pelajaran matematika,&nbsp; &nbsp; &nbsp; ipa, bahasa indonesia, bahasa inggris, pkn, dan ips
  <br />
  <br />
  &nbsp;&nbsp;&nbsp;<button class="click">Mulai Belajar</button>
  </div>
  
  </div>

      </div>
    </div>
  );
}

export default LandingPage;
