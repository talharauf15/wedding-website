import { Arch, ArchMark, Heading, Ornament, Photo, Verse } from "@/components/primitives";
import { Countdown, Gallery, MotionController, Navigation, Schedule } from "@/components/interactions";
import { Opening } from "@/components/opening";
import { brideParty, events, milestones, photos, rsvp, verses, wedding } from "@/lib/wedding";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <svg className="clip-definitions" aria-hidden="true"><defs><clipPath id="portrait-arch" clipPathUnits="objectBoundingBox"><path d="M0 1V.513C0 .205 .323 .103 .5 0C.677 .103 1 .205 1 .513V1Z" /></clipPath><clipPath id="landscape-arch" clipPathUnits="objectBoundingBox"><path d="M0 1V.667C0 .267 .323 .133 .5 0C.677 .133 1 .267 1 .667V1Z" /></clipPath><clipPath id="hero-arch" clipPathUnits="objectBoundingBox"><path d="M0 1V.633C0 .247 .318 .127 .5 0C.682 .127 1 .247 1 .633V1Z" /></clipPath></defs></svg>
    <Opening /><Navigation /><MotionController />
    <main id="main">
      <section id="hero" className="hero section-shell" aria-label="Wedding invitation">
        <div className="hero-image"><Photo id="hero" className="hero-photo" priority /></div>
        <div className="hero-copy center">
          <p className="arabic hero-enter delay-bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
          <div className="hero-enter delay-ornament"><Ornament /></div>
          <h1><span className="mask"><span className="name-enter delay-bride">{wedding.bride}</span></span><em className="hero-enter delay-groom">&amp;</em><span className="mask"><span className="name-enter delay-groom">{wedding.groom}</span></span></h1>
          <p className="body hero-enter delay-intro">With the blessings of Allah, we invite you to join us as we begin our life together.</p>
          <p className="meta hero-enter delay-date">{wedding.date}<span className="inline-diamond" />{wedding.city}</p>
          <Countdown />
          <a className="btn btn-solid hero-enter delay-button" href="#events">View Events</a>        </div>
      </section>

      <section id="invitation" className="section invitation center">
        <div className="jaali" aria-hidden="true" /><Arch />
        <div className="invitation-copy center">
          <p className="greeting reveal">Assalam-o-Alaikum</p><Ornament />
          <p className="eyebrow reveal">Together with our families</p>
          <p className="body reveal">We request the honour of your presence<br />at the wedding celebration of</p>
          <h2 className="invitation-names reveal">{wedding.bride}<em>&amp;</em>{wedding.groom}</h2>
          <div className="parents reveal"><div><p className="meta">Daughter of</p><p>{wedding.brideParents}</p></div><div><p className="meta">Son of</p><p>{wedding.groomParents}</p></div></div>
          <Ornament /><p className="meta reveal">{wedding.weekday}, {wedding.date}</p><p className="body reveal">{wedding.city}, Pakistan</p>
          <Verse verse={verses.invitation} className="reveal" />
        </div>
      </section>

      <section id="story" className="section story">
        <div className="story-images reveal settle"><Photo id="story" className="portrait-arch" /><div className="story-detail" data-parallax="20"><Photo id="detail" /></div></div>
        <div className="story-copy"><Heading label="Our Story">Written in our <em>stars</em></Heading><p className="body reveal">{wedding.story}</p>
          <div className="story-rail">{milestones.map(({ year, title, note }, i) => <div className="timeline-row reveal from-left" key={title} style={{ transitionDelay: `${i * 110}ms` }}><span className="timeline-time">{year === milestones[i - 1]?.year ? "" : year}</span><div className="timeline-copy"><h3>{title}</h3><p>{note}</p></div></div>)}</div>
        </div>
      </section>

      <section id="events" className="section events-section"><Heading label="The Celebrations">Wedding Events</Heading><p className="body section-intro reveal">Three evenings in {wedding.city}. We would be honoured to have you at each of them.</p>
        <div className="event-grid">{events.map((event, i) => <article key={event.id} className={`event-card reveal ${i === 1 ? "main-event" : ""}`} style={{ transitionDelay: `${i * 180}ms` }}><span className="ghost-date" aria-hidden="true">{event.numeral}</span>{i === 1 && <p className="eyebrow">The Main Day</p>}<Photo id={event.id} className="landscape-arch" /><h3>{event.name}</h3><p className="meta">{event.short} · {event.time}</p><div className="short-rule" /><p className="event-venue">{event.venue} · {wedding.city}</p><p className="dress-code">Dress code — {event.dress}</p><p className="body">{event.description}</p><a href={`#venue-${event.id}`} className={`btn ${i === 1 ? "btn-gold" : "btn-outline"}`}>View Location</a></article>)}</div>
      </section>

      <section id="nikkah" className="section nikkah center"><p className="eyebrow reveal fade-only">The Ceremony</p><div className="nikkah-arch"><Arch /><div className="center"><h2 className="reveal fade-only">Nikkah</h2><Ornament /><p className="meta reveal fade-only">{wedding.weekday}, {wedding.date}</p><p className="ceremony-time reveal fade-only">7:15 PM</p><p className="body reveal fade-only">{events[1].venue} · {wedding.city}</p></div></div><p className="ceremony-message reveal fade-only">{wedding.nikkahMessage}</p><Verse verse={verses.nikkah} className="reveal fade-only" />
        <div className="ceremony-info">{[["Ceremony", "7:15 PM", "Seated by 7:00 PM"], ["Dinner", "8:00 PM", "Main hall"], ["Seating", "[Arrangement]", "[Seating note]"], ["Photography", "[Guidance]", "[Note for guests]"]].map(([label, value, note], i) => <div className="reveal fade-only" key={label} style={{ transitionDelay: `${i * 200}ms` }}><p className="eyebrow">{label}</p><p className="info-value">{value}</p><p className="body">{note}</p></div>)}</div>
      </section>

      <section id="families" className="section families"><Heading label="Our Families">With the blessings<br />of our parents</Heading><div className="family-grid"><article className="family-card reveal from-left"><Photo id="bride" className="portrait-arch" /><p className="eyebrow">The Bride</p><h3>{wedding.bride}</h3><p className="meta">Daughter of</p><p className="family-parent">{wedding.brideParents}</p></article><div className="family-spine reveal" aria-hidden="true"><span /></div><article className="family-card reveal from-right"><Photo id="groom" className="portrait-arch" /><p className="eyebrow">The Groom</p><h3>{wedding.groom}</h3><p className="meta">Son of</p><p className="family-parent">{wedding.groomParents}</p></article></div></section>

      <section id="party" className="section party"><Heading label="The Bride’s Side">Standing beside <em>her</em></Heading>
        {brideParty.map(group => <div className="party-group" key={group.label}>
          <div className="party-label reveal"><span className="short-rule" /><p className="eyebrow">{group.label}</p><span className="short-rule" /></div>
          {group.people.some(person => person.src)
            ? <div className="party-grid">{group.people.map((person, i) => <article className="party-card reveal settle" key={`${group.label}-${i}`} style={{ transitionDelay: `${i * 110}ms` }}><Photo photo={{ src: person.src ?? "", alt: person.alt ?? `${person.name}, portrait`, position: person.position, zoom: person.zoom }} className="portrait-arch" sizes="(min-width: 1100px) 275px, (min-width: 768px) 230px, 45vw" /><h3>{person.name}</h3><p>{person.role}</p></article>)}</div>
            : <p className="party-names reveal">{group.people.map((person, i) => <span key={`${group.label}-${i}`}>{i > 0 && <span className="inline-diamond" />}{person.name}</span>)}</p>}
        </div>)}
      </section>

      <section id="schedule" className="section schedule"><Heading label="The Order of the Evening">Every moment, together</Heading><Schedule /></section>

      <section id="venue" className="section venues"><Heading label="Venues & Directions">Where to find us</Heading><div className="venue-list">{events.map((event, i) => <article key={event.id} id={`venue-${event.id}`} className={`venue-block venue-${i}`}><div className={`venue-image reveal ${i === 1 ? "from-right" : "from-left"}`}>{!photos[["venueMehndi", "venueBaraat", "venueWalima"][i]].src && event.mapQuery ? <iframe src={`https://maps.google.com/maps?q=${event.mapQuery}&z=15&output=embed`} loading="lazy" title={`${event.venue} map`} style={{ width: "100%", height: "100%", border: 0 }} /> : <Photo id={["venueMehndi", "venueBaraat", "venueWalima"][i]} />}</div><div className={`venue-copy reveal ${i === 1 ? "from-left" : "from-right"}`}><p className="eyebrow">{event.name} · {event.date}</p><h3>{event.venue}</h3><div className="short-rule" /><p className="body">{event.address}<br />{wedding.city}, Pakistan</p><div className="venue-actions">{event.mapQuery ? <><a className="btn btn-solid" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`}>Open in Google Maps</a><a className="btn btn-outline" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.mapQuery)}`}>Get Directions</a></> : <p className="venue-pending">Location and directions will be shared here once confirmed.</p>}</div></div></article>)}</div></section>

      <section id="gallery" className="section gallery"><Heading label="Gallery">Moments, so far</Heading><Gallery /></section>

      <section id="rsvp" className="section rsvp center"><Heading label="RSVP">Will you join <em>us</em>?</Heading>
        <p className="body reveal">Kindly let us know so we can keep a place for you. A message on WhatsApp is all it takes.</p>
        <p className="meta reveal">Kindly respond by {rsvp.by}</p>
        <div className="rsvp-actions reveal">
          {rsvp.whatsapp
            ? <a className="btn btn-solid" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(rsvp.message)}`}>RSVP on WhatsApp</a>
            : <p className="venue-pending">The WhatsApp number will be shared here once confirmed.</p>}
        </div>
      </section>

      <section id="closing" className="closing"><div className="closing-background" data-parallax="40"><Photo id="closing" /><div className="closing-wash" /></div><Arch /><div className="closing-copy center"><p className="eyebrow reveal">Until then</p><h2 className="reveal">We can’t wait to<br /><em>celebrate</em> with you</h2><p className="body reveal">Your presence, prayers and duas mean the world to us.</p><Ornament /><p className="closing-names reveal">{wedding.bride}<em>&amp;</em>{wedding.groom}</p><p className="meta reveal">{wedding.dateNumeric}</p><p className="hashtag reveal">{wedding.hashtags.map((tag, i) => <span key={tag}>{i > 0 && <span className="inline-diamond" />}#{tag}</span>)}</p></div><footer><a className="monogram" href="#hero"><ArchMark />{wedding.monogram}</a><p>With love, from our families to yours</p><a href="#hero">{wedding.city} · 2027 <span aria-hidden="true">↑</span></a></footer></section>
    </main>
  </>;
}
