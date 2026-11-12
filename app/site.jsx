"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { business, photos } from "../lib/site-config";

const navItems = [
  ["Início", "inicio"], ["A Marcenaria", "marcenaria"], ["Ambientes", "ambientes"],
  ["Objetos", "objetos"], ["Projetos", "projetos"], ["Depoimentos", "depoimentos"], ["Contato", "contato"]
];
const categories = ["Todos", "Cozinhas", "Quartos", "Salas", "Closets"];
const marqueeImages = photos.heroMarquee;
const testimonials = [
  { name: "Ana Paula", place: "Cozinha & sala", quote: "Desde a primeira conversa, senti que meu projeto estava em boas mãos. A cozinha ficou linda, funcional e com um acabamento que dá gosto de olhar.", initials: "AP" },
  { name: "Marcos e Luiza", place: "Quarto do casal", quote: "Cada cantinho foi aproveitado com inteligência. O cuidado na instalação e a atenção aos detalhes fizeram toda a diferença para a nossa casa.", initials: "ML" },
  { name: "Renata Costa", place: "Área gourmet", quote: "A equipe entendeu exatamente o que a gente queria. Ficou acolhedor, prático e com a nossa cara. Já estamos pensando no próximo ambiente!", initials: "RC" }
];

function wrapMarqueeOffset(offset, halfWidth) {
  if (halfWidth <= 0) return offset;
  if (offset <= -halfWidth) return offset + halfWidth;
  if (offset > 0) return offset - halfWidth;
  return offset;
}

function Icon({ name, size = 22 }) {
  const shared = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    detail: <><path d="M12 3 14.8 9.2 21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8L12 3Z" /><path d="m19 3 .7 1.3L21 5l-1.3.7L19 7l-.7-1.3L17 5l1.3-.7L19 3Z" /></>,
    wood: <><path d="M4 5c4-3 12-3 16 0M4 9c4-3 12-3 16 0M4 13c4-3 12-3 16 0M4 17c4-3 12-3 16 0" /><path d="M5 4v16m14-16v16" /></>,
    plan: <><path d="M4 20V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v15H4Z" /><path d="M8 8h8M8 12h5m-5 4h8" /></>,
    fair: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <><path d="M7 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-2l-5-2-2 3a13 13 0 0 1-6-6l3-2-2-5Z" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    left: <><path d="m15 18-6-6 6-6" /></>,
    right: <><path d="m9 18 6-6-6-6" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>
  };
  return <svg {...shared}>{paths[name] || paths.detail}</svg>;
}

function SectionHeading({ eyebrow, title, text, light = false }) {
  return <div className={`section-heading${light ? " section-heading--light" : ""}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>;
}

function Photo({ src, alt, className = "" }) {
  return <img className={className} src={src} alt={alt} loading="lazy" />;
}

export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [category, setCategory] = useState("Todos");
  const [lightbox, setLightbox] = useState(null);
  const [testimonial, setTestimonial] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const menuToggleRef = useRef(null);
  const menuCloseRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const marqueeOffsetRef = useRef(0);
  const marqueeVelocityRef = useRef(0);
  const marqueeDraggingRef = useRef(false);
  const marqueeDragRef = useRef(null);

  const filteredProjects = useMemo(
    () => category === "Todos" ? photos.projects : photos.projects.filter((project) => project.category === category),
    [category]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    navItems.forEach(([, id]) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuCloseRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const drawer = document.getElementById("mobile-menu");
      const focusable = drawer?.querySelectorAll("a[href], button:not([disabled])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      menuToggleRef.current?.focus();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    let frameId;
    const animate = () => {
      if (!marqueeDraggingRef.current) {
        if (reducedMotion) {
          marqueeVelocityRef.current = 0;
        } else if (Math.abs(marqueeVelocityRef.current) > 0.1) {
          marqueeOffsetRef.current += marqueeVelocityRef.current;
          marqueeVelocityRef.current *= 0.95;
        } else {
          marqueeVelocityRef.current = 0;
          marqueeOffsetRef.current -= 0.8;
        }
      }

      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        marqueeOffsetRef.current = wrapMarqueeOffset(marqueeOffsetRef.current, halfWidth);
        track.style.transform = `translate3d(${marqueeOffsetRef.current}px, 0, 0)`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((current) => (current + 1) % filteredProjects.length);
      if (event.key === "ArrowLeft") setLightbox((current) => (current - 1 + filteredProjects.length) % filteredProjects.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("lightbox-open");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [lightbox, filteredProjects.length]);

  const whatsappUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de conversar sobre um projeto de móveis planejados.")}`
    : null;

  function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = `Olá! Meu nome é ${data.get("name")}. Telefone: ${data.get("phone")}. Ambiente: ${data.get("room")}. ${data.get("message")}`;
    if (!business.whatsapp) {
      setFormStatus("Seus dados foram validados. Configure o número do WhatsApp em lib/site-config.js para enviar sua mensagem.");
      return;
    }
    window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setFormStatus("Sua mensagem está pronta no WhatsApp. É só tocar em enviar!");
    form.reset();
  }

  function handleMarqueePointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const track = event.currentTarget;
    track.setPointerCapture(event.pointerId);
    marqueeDraggingRef.current = true;
    marqueeVelocityRef.current = 0;
    marqueeDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: marqueeOffsetRef.current,
      lastX: event.clientX,
      lastTime: event.timeStamp
    };
    track.classList.add("is-dragging");
  }

  function handleMarqueePointerMove(event) {
    const drag = marqueeDragRef.current;
    if (!marqueeDraggingRef.current || !drag || drag.pointerId !== event.pointerId) return;

    const elapsed = Math.max(event.timeStamp - drag.lastTime, 1);
    marqueeVelocityRef.current = ((event.clientX - drag.lastX) / elapsed) * 16.67;
    marqueeOffsetRef.current = wrapMarqueeOffset(
      drag.startOffset + event.clientX - drag.startX,
      event.currentTarget.scrollWidth / 2
    );
    drag.lastX = event.clientX;
    drag.lastTime = event.timeStamp;

    const track = event.currentTarget;
    track.style.transform = `translate3d(${marqueeOffsetRef.current}px, 0, 0)`;
  }

  function handleMarqueePointerEnd(event) {
    const drag = marqueeDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    marqueeDraggingRef.current = false;
    marqueeDragRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
  }

  function handleMarqueeKeyDown(event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const track = marqueeTrackRef.current;
    if (track) {
      marqueeOffsetRef.current = wrapMarqueeOffset(
        marqueeOffsetRef.current + (event.key === "ArrowLeft" ? 80 : -80),
        track.scrollWidth / 2
      );
      track.style.transform = `translate3d(${marqueeOffsetRef.current}px, 0, 0)`;
    }
  }

  return <>
    <header className={`site-header${scrolled ? " site-header--solid" : ""}`}>
      <a className="brand" href="#inicio" aria-label={`${business.name}, início`} onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">JR<span>·</span></span>
        <span className="brand-name">{business.name}<small>marcenaria sob medida</small></span>
      </a>
      <button ref={menuToggleRef} className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span />
      </button>
      <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Navegação principal">
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#contato" onClick={() => setMenuOpen(false)}>Solicitar orçamento <Icon name="arrow" size={16} /></a>
      </nav>
    </header>

    <button className={`menu-overlay${menuOpen ? " menu-overlay--open" : ""}`} type="button" aria-label="Fechar menu" aria-hidden={!menuOpen} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} />
    <aside id="mobile-menu" className={`menu-drawer${menuOpen ? " menu-drawer--open" : ""}`} aria-label="Menu de navegação" aria-hidden={!menuOpen} inert={!menuOpen}>
      <div className="menu-drawer-header">
        <a className="brand" href="#inicio" aria-label={`${business.name}, início`} onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">JR<span>·</span></span>
          <span className="brand-name">{business.name}<small>marcenaria sob medida</small></span>
        </a>
        <button ref={menuCloseRef} className="menu-close" type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><span /><span /></button>
      </div>
      <nav className="drawer-links" aria-label="Navegação móvel">
        {navItems.map(([label, id], index) => <a key={id} href={`#${id}`} tabIndex={menuOpen ? 0 : -1} style={{ "--link-delay": `${150 + index * 60}ms` }} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <a className="button button--gold drawer-cta" href="#contato" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Solicitar orçamento <Icon name="arrow" size={18} /></a>
    </aside>

    <main>
      <section className="hero hero--editorial" id="inicio">
        <div className="hero-content reveal">
          <span className="eyebrow"><i /> Feito à mão. Pensado para você.</span>
          <h1>Móveis planejados<br />com <em>alma de madeira.</em></h1>
          <p>O calor do feito à mão, a precisão do sob medida. Criamos espaços com a sua história em cada detalhe.</p>
          <div className="hero-actions">
            <a className="button button--gold" href={whatsappUrl || "#contato"} target={whatsappUrl ? "_blank" : undefined} rel={whatsappUrl ? "noreferrer" : undefined}>Solicitar orçamento <Icon name="arrow" /></a>
            <a className="button button--outline" href="#projetos">Conheça nossos projetos <Icon name="arrow" size={17} /></a>
          </div>
        </div>
        <div className="hero-marquee" aria-label="Galeria de ambientes planejados">
          <div className="marquee-mask marquee-mask--top" aria-hidden="true"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z" fill="var(--ivory)" /></svg></div>
          <div
            ref={marqueeTrackRef}
            className="marquee-track"
            role="region"
            aria-label="Galeria em movimento: arraste para explorar os ambientes"
            tabIndex={0}
            onPointerDown={handleMarqueePointerDown}
            onPointerMove={handleMarqueePointerMove}
            onPointerUp={handleMarqueePointerEnd}
            onPointerCancel={handleMarqueePointerEnd}
            onKeyDown={handleMarqueeKeyDown}
          >
            {[0, 1].map((copy) => <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
              {marqueeImages.map((photo) => <div className="marquee-slide" key={photo.image}>
                <img src={photo.image} alt={copy === 0 ? photo.alt : ""} loading="lazy" decoding="async" draggable={false} />
              </div>)}
            </div>)}
          </div>
          <div className="marquee-mask marquee-mask--bottom" aria-hidden="true"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z" fill="var(--ivory)" /></svg></div>
        </div>
        <div className="hero-marquee-caption"><span><i /> Ambientes feitos para viver</span><span>Arraste para explorar</span></div>
        <a className="scroll-cue scroll-cue--editorial" href="#diferenciais" aria-label="Role para conhecer nossos diferenciais"><span /> Conheça a marcenaria</a>
      </section>

      <section className="features-wrap" id="diferenciais" aria-label="Nossos diferenciais">
        <div className="features wood-strip">
          {[
            ["detail", "Atenção aos detalhes", "Acabamento que você percebe no primeiro olhar."],
            ["wood", "Madeira de qualidade", "Materiais escolhidos para durar e encantar."],
            ["plan", "Projeto sob medida", "Cada centímetro desenhado para a sua rotina."],
            ["fair", "Preço justo", "Transparência e cuidado do começo ao fim."]
          ].map(([icon, title, text], index) => <article className={`feature-card${index === 3 ? " feature-card--highlight" : ""}`} key={title}>
            <span className="feature-icon"><Icon name={icon} size={25} /></span>
            <div><h3>{title}</h3><p>{text}</p></div>
          </article>)}
        </div>
      </section>

      <section className="about section-pad" id="marcenaria">
        <div className="about-image-wrap reveal">
          <Photo src={photos.workshop} alt="Bancada de marcenaria com ferramentas e madeira em processo de fabricação" />
          <div className="experience-seal"><span>feito com</span><strong>cuidado</strong><span>em cada detalhe</span><i>✳</i></div>
          <span className="image-note">O valor do trabalho bem-feito</span>
        </div>
        <div className="about-copy reveal">
          <span className="eyebrow">A marcenaria</span>
          <h2>Madeira boa tem<br /><em>história para contar.</em></h2>
          <p>Na Jr Moveis palnejados, acreditamos que uma casa fica completa quando cada espaço tem propósito — e um pouco de quem vive nele.</p>
          <p>Unimos o saber da marcenaria artesanal a soluções atuais de design e organização. Escutamos, desenhamos e fazemos com calma, precisão e respeito pelo seu projeto.</p>
          <a className="text-link" href="#processo">Conheça nosso jeito de fazer <Icon name="arrow" size={18} /></a>
          <div className="about-signature">Jr Moveis palnejados <span>— móveis feitos para ficar</span></div>
        </div>
      </section>

      <section className="rooms section-pad wood-panel" id="ambientes">
        <SectionHeading eyebrow="Cada canto, uma possibilidade" title={<>Ambientes que abraçam<br /><em>a sua rotina.</em></>} text="Soluções completas, feitas sob medida para o jeito que você vive." light />
        <div className="showcase-list">
          {photos.rooms.map((room, index) => <article className={`showcase reveal${index % 2 ? " showcase--reverse" : ""}`} key={room.title}>
            <div className="showcase-photo"><Photo src={room.image} alt={room.alt} /><span className="showcase-number">0{index + 1}</span></div>
            <div className="showcase-copy"><span className="eyebrow">Ambientes sob medida</span><h3>{room.title}</h3><p>{room.text}</p><a href="#contato" className="text-link text-link--light">Vamos conversar <Icon name="arrow" size={18} /></a></div>
          </article>)}
        </div>
      </section>

      <section className="objects section-pad" id="objetos">
        <SectionHeading eyebrow="Feitos para fazer parte" title={<>Peças únicas.<br /><em>Do seu jeito.</em></>} text="Também criamos móveis especiais que transformam uma ideia em parte da sua casa." />
        <div className="object-grid">
          {photos.objects.map((object, index) => <article className={`object-card reveal${index === 0 || index === 4 ? " object-card--wide" : ""}`} key={object.title}>
            <div className="object-photo"><Photo src={object.image} alt={object.alt} /><span className="object-index">0{index + 1}</span></div>
            <div className="object-copy"><h3>{object.title}</h3><p>{object.text}</p><a href="#contato" aria-label={`Solicitar orçamento para ${object.title}`}><Icon name="arrow" size={19} /></a></div>
          </article>)}
        </div>
      </section>

      <section className="portfolio section-pad" id="projetos">
        <SectionHeading eyebrow="Feito para durar. Feito para você." title={<>Projetos com identidade<br /><em>em cada detalhe.</em></>} text="Um pouco do que já saiu da nossa oficina e encontrou um novo lar." />
        <div className="portfolio-filters" role="group" aria-label="Filtrar projetos por ambiente">
          {categories.map((item) => <button key={item} type="button" className={category === item ? "selected" : ""} aria-pressed={category === item} onClick={() => { setCategory(item); setLightbox(null); }}>{item}</button>)}
        </div>
        <div className="project-grid">
          {filteredProjects.map((project, index) => <button className="project-card reveal" key={project.title} type="button" onClick={() => setLightbox(index)} aria-label={`Ampliar projeto ${project.title}`}>
            <Photo src={project.image} alt={project.alt} /><span className="project-overlay"><span>{project.category}</span><strong>{project.title}</strong><i>+</i></span>
          </button>)}
        </div>
        <div className="transformation reveal">
          <div className="transformation-heading"><span className="eyebrow">Uma ideia, muitas possibilidades</span><h3>Do primeiro traço<br />ao seu novo espaço.</h3><p>O desenho nasce da conversa. A gente cuida de cada etapa até a ideia virar parte da sua casa.</p><a className="text-link" href="#contato">Comece o seu projeto <Icon name="arrow" size={18} /></a></div>
          <div className="transformation-image"><Photo src={photos.projects[0].image} alt="Projeto de cozinha planejada pronto, com acabamento detalhado" /><span><i>projeto</i><b>feito para a vida real</b></span></div>
          <div className="blueprint-card" aria-label="Esboço ilustrativo do planejamento de um móvel"><span>ESTUDO DE MARCENARIA · 01</span><div className="blueprint-drawing"><div className="blueprint-cabinet"><i /><i /><i /><b /></div><div className="measure measure--top">2,40 m</div><div className="measure measure--side">2,10 m</div></div><small>Desenho técnico ilustrativo</small></div>
        </div>
      </section>

      <section className="process section-pad wood-panel" id="processo">
        <SectionHeading eyebrow="Combinado é combinado" title={<>Do primeiro papo<br /><em>à última instalação.</em></>} text="Você acompanha tudo de perto. Nosso processo é claro, cuidadoso e feito junto com você." light />
        <ol className="process-list">
          {[
            ["01", "Conversa", "A gente escuta suas ideias, necessidades e desejos."],
            ["02", "Medição", "Conhecemos o espaço para aproveitar cada centímetro."],
            ["03", "Projeto 3D", "Você visualiza e ajusta o projeto antes de produzir."],
            ["04", "Fabricação", "Mãos experientes transformam o projeto em realidade."],
            ["05", "Instalação", "Montagem cuidadosa e acabamento no lugar certo."]
          ].map(([number, title, text]) => <li className="process-step reveal" key={number}><span className="step-number">{number}</span><span className="step-dot" /><h3>{title}</h3><p>{text}</p></li>)}
        </ol>
      </section>

      <section className="testimonials section-pad" id="depoimentos">
        <SectionHeading eyebrow="Palavra de quem já viveu" title={<>Casa boa é casa<br /><em>com boas histórias.</em></>} text="A melhor parte do nosso trabalho é saber que ele virou parte da vida de alguém." />
        <div className="testimonial-wrap reveal">
          <div className="testimonial-mark">“</div>
          <div className="testimonial-card" aria-live="polite">
            <div className="stars" aria-label="5 de 5 estrelas">★★★★★</div>
            <blockquote>{testimonials[testimonial].quote}</blockquote>
            <div className="customer"><span className="customer-avatar">{testimonials[testimonial].initials}</span><span><strong>{testimonials[testimonial].name}</strong><small>{testimonials[testimonial].place}</small></span></div>
          </div>
          <div className="testimonial-controls">
            <button type="button" onClick={() => setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)} aria-label="Depoimento anterior"><Icon name="left" /></button>
            <div className="testimonial-dots">{testimonials.map((item, index) => <button type="button" key={item.name} className={index === testimonial ? "selected" : ""} aria-label={`Ver depoimento de ${item.name}`} aria-pressed={index === testimonial} onClick={() => setTestimonial(index)} />)}</div>
            <button type="button" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} aria-label="Próximo depoimento"><Icon name="right" /></button>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div><span className="eyebrow eyebrow--light">Seu próximo capítulo começa em casa</span><h2>Vamos projetar o móvel<br /><em>dos seus sonhos?</em></h2></div>
        <a className="button button--light" href={whatsappUrl || "#contato"} target={whatsappUrl ? "_blank" : undefined} rel={whatsappUrl ? "noreferrer" : undefined}>Converse com a gente <Icon name="arrow" /></a>
        <span className="cta-grain" aria-hidden="true" />
      </section>

      <section className="contact section-pad" id="contato">
        <div className="contact-copy reveal"><SectionHeading eyebrow="Vamos tirar a ideia do papel?" title={<>O seu espaço<br /><em>começa aqui.</em></>} text="Conte para nós o que você está imaginando. A primeira conversa é sem compromisso." />
          <div className="contact-details">
            <a href={business.whatsapp ? `https://wa.me/${business.whatsapp}` : "#contato"}><span><Icon name="phone" /></span><div><small>Telefone / WhatsApp</small><strong>{business.phone}</strong></div></a>
            <a href={`mailto:${business.email}`}><span><Icon name="mail" /></span><div><small>E-mail</small><strong>{business.email}</strong></div></a>
            <div><span><Icon name="pin" /></span><div><small>Onde estamos</small><strong>{business.address}</strong></div></div>
            <div><span><Icon name="clock" /></span><div><small>Horário de atendimento</small><strong>{business.hours}</strong></div></div>
          </div>
          <a className="instagram-link" href={business.instagram} target="_blank" rel="noreferrer"><Icon name="instagram" /> Acompanhe os projetos no Instagram <Icon name="arrow" size={16} /></a>
        </div>
        <div className="contact-form-wrap reveal">
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <h3>Vamos conversar?</h3><p>Preencha os campos e conte um pouco sobre o seu projeto.</p>
            <label htmlFor="name">Seu nome</label><input id="name" name="name" type="text" placeholder="Como podemos chamar você?" autoComplete="name" required />
            <div className="form-row"><div><label htmlFor="phone">Telefone</label><input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" autoComplete="tel" required pattern=".{8,}" title="Informe um telefone com DDD." /></div><div><label htmlFor="room">Ambiente</label><select id="room" name="room" defaultValue="" required><option value="" disabled>Escolha uma opção</option><option>Cozinha</option><option>Quarto</option><option>Sala</option><option>Closet</option><option>Área gourmet</option><option>Outro projeto</option></select></div></div>
            <label htmlFor="message">Como podemos ajudar?</label><textarea id="message" name="message" rows="4" placeholder="Conte um pouquinho do que você tem em mente..." required />
            <button className="button button--dark" type="submit">Enviar mensagem <Icon name="arrow" /></button>
            <p className="form-status" role="status" aria-live="polite">{formStatus}</p>
          </form>
          <div className="map-placeholder"><iframe title="Mapa de localização — placeholder para configurar o endereço da marcenaria" src={business.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><span><Icon name="pin" size={16} /> Mapa ilustrativo — atualize o endereço em lib/site-config.js</span></div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="footer-main">
        <div className="footer-about"><a className="brand brand--footer" href="#inicio"><span className="brand-mark">JR<span>·</span></span><span className="brand-name">{business.name}<small>marcenaria sob medida</small></span></a><p>O cuidado artesanal da madeira, o desenho que combina com você. Móveis planejados para viver por muitos anos.</p><a href={business.instagram} className="footer-social" aria-label="Instagram da marcenaria" target="_blank" rel="noreferrer"><Icon name="instagram" /></a></div>
        <div className="footer-links"><h3>Navegue</h3>{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
        <div className="footer-links footer-contact"><h3>Fale com a gente</h3><a href={business.whatsapp ? `https://wa.me/${business.whatsapp}` : "#contato"}>{business.phone}</a><a href={`mailto:${business.email}`}>{business.email}</a><span>{business.address}</span><a href={business.instagram} target="_blank" rel="noreferrer">Instagram <Icon name="arrow" size={14} /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}. Feito com cuidado.</span><a href="#inicio">Voltar ao início ↑</a><span>Madeira, tempo e boas histórias.</span></div>
    </footer>

    <a className={`whatsapp-float${whatsappUrl ? "" : " whatsapp-float--placeholder"}`} href={whatsappUrl || "#contato"} target={whatsappUrl ? "_blank" : undefined} rel={whatsappUrl ? "noreferrer" : undefined} aria-label={whatsappUrl ? "Converse pelo WhatsApp" : "Configure o WhatsApp para ativar o contato rápido"}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.4ZM12.1 21.7a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.9 1 1-3.8-.3-.4a9.8 9.8 0 1 1 8.6 4.8Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4H8c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.2 3.4 5.4 4.7.8.4 1.4.6 1.9.7.8.3 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" /></svg>
    </a>

    {lightbox !== null && filteredProjects[lightbox] && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Projeto ${filteredProjects[lightbox].title}`} onClick={() => setLightbox(null)}>
      <button className="lightbox-close" type="button" aria-label="Fechar imagem ampliada" onClick={() => setLightbox(null)}><Icon name="close" size={26} /></button>
      <button className="lightbox-arrow lightbox-arrow--left" type="button" aria-label="Projeto anterior" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + filteredProjects.length) % filteredProjects.length); }}><Icon name="left" size={28} /></button>
      <div className="lightbox-content" onClick={(event) => event.stopPropagation()}><Photo src={filteredProjects[lightbox].image} alt={filteredProjects[lightbox].alt} /><span>{filteredProjects[lightbox].category} <i>—</i> {filteredProjects[lightbox].title}</span></div>
      <button className="lightbox-arrow lightbox-arrow--right" type="button" aria-label="Próximo projeto" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % filteredProjects.length); }}><Icon name="right" size={28} /></button>
    </div>}
  </>;
}
