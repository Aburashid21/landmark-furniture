import { useEffect, useState } from 'react'
import './App.css'

const categories = [
  { name: 'طاولات الطعام', count: 'DINING TABLES', image: '/category-covers/dining-tables-cover.png' },
  { name: 'تخوت البيبي', count: 'BABY BEDS', image: '/category-covers/baby-beds-cover.png' },
]

const diningTables = [
  {
    name: 'طاولة سفرة بورسلان بني مع كراسي كبتشينو',
    size: '140 × 80 سم',
    price: '170 دينار',
    deliveryAndInstallation: 'شامل داخل عمّان والزرقاء',
    description: 'طاولة سفرة بسطح بورسلان باللون البني، مع كراسي جلد وتر بروف باللون الكبتشينو. تحتوي أسفل الطاولة على لوح خشب للحماية. مقاومة للماء، وتتحمل أوزانًا عالية، وعملية ومناسبة للمطابخ وغرف القعدة.',
    image: '/products/610983361_1313209080823179_4724190512312101976_n.jpg',
  },
  '/products/651279064_1370926135051473_6528512084157451101_n.jpg',
  '/products/652909389_1370927001718053_2314520121413290971_n.jpg',
  '/products/653152324_1370926971718056_2705902785945854472_n.jpg',
  '/products/653702750_1370926995051387_1072880539003792487_n.jpg',
]

const babyBeds = [
  '/baby-beds/574300886_1260938942716860_7005608090368926507_n.jpg',
  '/baby-beds/574565514_1260938946050193_5017713417928012311_n.jpg',
  '/baby-beds/574582339_1260939059383515_3824844378531985966_n.jpg',
  '/baby-beds/574958145_1260939326050155_2344239258223465394_n.jpg',
  '/baby-beds/758469702_1488398126637606_1921096182496363962_n.jpg',
  '/baby-beds/758636123_1488398156637603_1638502525511701813_n.jpg',
  '/baby-beds/758964544_1488398113304274_6846383722858909972_n.jpg',
  '/baby-beds/758964575_1488398149970937_5466107343115622525_n.jpg',
]

const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const categoryImage = (image) => image.startsWith('/') ? image : photo(image, 700)

function BrandMark() {
  return <a className="brand" href="/" aria-label="Landmark Furniture الرئيسية"><img className="brand-logo" src="/logo.png" alt="Landmark Furniture" /></a>
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null)

  useEffect(() => {
    const syncPath = () => {
      setCurrentPath(window.location.pathname)
      setSelectedGalleryImage(null)
    }
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    setSelectedGalleryImage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openGalleryImage = (image) => {
    setSelectedGalleryImage(image)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeGalleryImage = () => {
    setSelectedGalleryImage(null)
    const galleryId = currentPath === '/baby-beds' ? 'baby-beds' : 'dining-tables'
    window.requestAnimationFrame(() => document.getElementById(galleryId)?.scrollIntoView())
  }

  const selectedDiningProduct = currentPath === '/dining-tables'
    ? diningTables.find((product) => typeof product !== 'string' && product.image === selectedGalleryImage)
    : null

  const navigateHomeSection = (event, section) => {
    if (currentPath === '/' && !selectedGalleryImage) return
    event.preventDefault()
    window.history.pushState({}, '', `/#${section}`)
    setCurrentPath('/')
    setSelectedGalleryImage(null)
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView()))
  }

  return (
    <div className="site-shell" dir="rtl">
      <div className="topline"><span>أهلاً بكم في لاند مارك للأثاث</span><span>توصيل وتركيب في جميع أنحاء الأردن</span><a href="tel:+96265551234">للاستفسار: ‎+962 6 555 1234</a></div>
      <header className="site-header" id="home">
        <BrandMark />
        <nav className="main-nav" aria-label="القائمة الرئيسية">
          <a className={currentPath === '/' ? 'active' : ''} href="/#home" aria-current={currentPath === '/' ? 'page' : undefined} onClick={(event) => navigateHomeSection(event, 'home')}>الرئيسية</a>
          <a className={currentPath === '/dining-tables' ? 'active' : ''} href="/dining-tables" aria-current={currentPath === '/dining-tables' ? 'page' : undefined} onClick={(event) => { event.preventDefault(); navigate('/dining-tables') }}>طاولات الطعام</a>
          <a className={currentPath === '/baby-beds' ? 'active' : ''} href="/baby-beds" aria-current={currentPath === '/baby-beds' ? 'page' : undefined} onClick={(event) => { event.preventDefault(); navigate('/baby-beds') }}>تخوت البيبي</a>
        </nav>
        <a className="header-contact" href="https://wa.me/962790000000" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.1 1.6 5.9L.1 24l6.4-1.7a12 12 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.5-8.3ZM12.1 21.7a10 10 0 0 1-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.5 4.5-10 10-10 2.7 0 5.2 1 7.1 2.9a10 10 0 0 1 2.9 7.1c0 5.4-4.5 9.9-10 9.9Z"/></svg> تواصل معنا</a>
      </header>

      <main>
        {selectedGalleryImage ? <section className="dining-detail" aria-label={`عرض صورة ${currentPath === '/baby-beds' ? 'تخت بيبي' : 'طاولة الطعام'}`}>
          <button className="dining-back" type="button" onClick={closeGalleryImage}><span aria-hidden="true">→</span> العودة إلى {currentPath === '/baby-beds' ? 'تخوت البيبي' : 'طاولات الطعام'}</button>
          <img src={selectedGalleryImage} alt={currentPath === '/baby-beds' ? 'صورة تخت بيبي' : 'صورة طاولة طعام'} />
          {selectedDiningProduct && <div className="dining-product-info dining-product-info--detail">
            <h2>{selectedDiningProduct.name}</h2>
            <p className="dining-product-price"><strong>المقاس:</strong> {selectedDiningProduct.size}</p>
            <p className="dining-product-price"><strong>السعر:</strong> {selectedDiningProduct.price}</p>
            <p className="dining-product-price"><strong>التوصيل والتركيب:</strong> {selectedDiningProduct.deliveryAndInstallation}</p>
            <p className="dining-product-description"><strong>الوصف:</strong> {selectedDiningProduct.description}</p>
          </div>}
        </section> : currentPath === '/dining-tables' ? <section className="section dining-section" id="dining-tables">
          <div className="section-heading">
            <div><span className="section-kicker">غرف الطعام</span><h2>طاولات الطعام</h2></div>
          </div>
          <div className="dining-grid">
            {diningTables.map((product, index) => {
              const image = typeof product === 'string' ? product : product.image
              const hasProductDetails = typeof product !== 'string'
              return <button className={`dining-card${hasProductDetails ? ' dining-card--product' : ''}`} type="button" onClick={() => openGalleryImage(image)} aria-label={`عرض صورة طاولة الطعام ${index + 1}`} key={image}>
                <img src={image} alt="صورة طاولة طعام" loading="lazy" />
                {hasProductDetails && <div className="dining-product-info dining-product-info--card">
                  <h3>{product.name}</h3>
                  <p className="dining-product-price"><strong>المقاس:</strong> {product.size}</p>
                  <p className="dining-product-price"><strong>السعر:</strong> {product.price}</p>
                  <p className="dining-product-price"><strong>التوصيل والتركيب:</strong> {product.deliveryAndInstallation}</p>
                  <p className="dining-product-description"><strong>الوصف:</strong> {product.description}</p>
                </div>}
              </button>
            })}
          </div>
        </section> : currentPath === '/baby-beds' ? <section className="section dining-section" id="baby-beds">
          <div className="section-heading">
            <div><span className="section-kicker">غرف الأطفال</span><h2>تخوت البيبي</h2></div>
          </div>
          <div className="dining-grid">
            {babyBeds.map((image, index) => <button className="dining-card" type="button" onClick={() => openGalleryImage(image)} aria-label={`عرض صورة تخت بيبي ${index + 1}`} key={image}>
              <img src={image} alt="صورة تخت بيبي" loading="lazy" />
            </button>)}
          </div>
        </section> : <>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src="/hero-landmark.png" alt="غرفة معيشة واسعة بأثاث أنيق وألوان دافئة" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <span className="eyebrow"><i /> تصميم يليق بحياتك</span>
            <h1 id="hero-title">بيت أجمل،<br /><em>يبدأ من هنا</em></h1>
            <p>قطع مختارة بعناية لتمنح منزلك أناقة وراحة تدوم.</p>
            <a className="button button-light" href="#categories">اكتشف مجموعتنا <span>←</span></a>
          </div>
        </section>

        <section className="intro-strip" id="about">
          <span className="intro-label">لاند مارك للأثاث <i>✳</i></span>
          <p>منزلُك يعكسُك. اختر قطعاً تشبهك، ونساعدك أن تصنع مساحةً تحبّ العودة إليها.</p>
          <a href="#featured">حكايتنا <span>←</span></a>
        </section>

        <section className="section categories-section" id="categories">
          <div className="section-heading">
            <div id="featured"><span className="section-kicker">مساحات لكل لحظة</span><h2>تسوّق حسب الفئة</h2></div>
            <a className="text-link" href="#featured">جميع الفئات <span>←</span></a>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => {
              const categoryPath = category.name === 'طاولات الطعام' ? '/dining-tables' : category.name === 'تخوت البيبي' ? '/baby-beds' : null
              return <a className={`category-card category-${index + 1}`} href={categoryPath || '#featured'} onClick={categoryPath ? (event) => { event.preventDefault(); navigate(categoryPath) } : undefined} key={category.name}>
              <img src={categoryImage(category.image)} alt={category.name} loading="lazy" />
              <span className="category-overlay" />
              <span className="category-copy"><strong>{category.name}</strong><small>{category.count}</small></span>
              <span className="category-arrow">↗</span>
            </a>
            })}
          </div>
        </section>

        <section className="service-banner">
          <div><span className="section-kicker">من عمّان إلى بيتك</span><h2>اختيارك علينا،<br />والراحة في بيتك.</h2><p>فريقنا جاهز يساعدك تختار القطعة المناسبة ويوصلها لباب بيتك.</p><a className="button button-dark" href="https://wa.me/962790000000" target="_blank" rel="noreferrer">احكِ مع مستشارنا <span>←</span></a></div>
          <img src={photo('photo-1600210492486-724fe5c67fb0', 1100)} alt="أثاث منزلي مريح بتصميم عصري" loading="lazy" />
          <span className="banner-number">L / 01</span>
        </section>
        </>}
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-main"><div className="footer-brand"><BrandMark /><p>أثاث يصنع مساحة أجمل<br />لحياتك اليومية.</p></div>
          <div className="footer-col"><h3>تجوّل</h3><a href="/dining-tables" onClick={(event) => { event.preventDefault(); navigate('/dining-tables') }}>طاولات الطعام</a><a href="/baby-beds" onClick={(event) => { event.preventDefault(); navigate('/baby-beds') }}>تخوت البيبي</a></div>
          <div className="footer-col"><h3>نحن هنا لمساعدتك</h3><a href="tel:+96265551234">+962 6 555 1234</a><a href="mailto:hello@landmarkfurniture.jo">hello@landmarkfurniture.jo</a><span>عمّان، الأردن</span></div>
          <div className="footer-col footer-hours"><h3>زوروا معرضنا</h3><span>السبت – الخميس</span><span>١٠ صباحاً – ٩ مساءً</span><a href="https://maps.google.com/?q=Amman+Jordan" target="_blank" rel="noreferrer">اعرف موقعنا <span>↗</span></a></div></div>
        <div className="footer-bottom"><span>© ٢٠٢٥ لاند مارك للأثاث. جميع الحقوق محفوظة.</span><span>صُنع بعناية في الأردن <b>✳</b></span></div>
      </footer>

      <a className="whatsapp-float" href="https://wa.me/962790000000" target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.1 1.6 5.9L.1 24l6.4-1.7a12 12 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.5-8.3ZM12.1 21.7a10 10 0 0 1-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.5 4.5-10 10-10 2.7 0 5.2 1 7.1 2.9a10 10 0 0 1 2.9 7.1c0 5.4-4.5 9.9-10 9.9Zm5.5-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.2 3.4 5.3 4.8.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg></a>
    </div>
  )
}

export default App
