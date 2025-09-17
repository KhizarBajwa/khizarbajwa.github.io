// js/components.js
import { animateTestimonialSwap } from './gsap.js';

/* -------------------- HERO -------------------- */
const Hero = {
  props: ['resume', 'topTags'],
  template: `
    <section class="hero-bg relative">
      <!-- decorative orbits -->
      <div class="orbits" aria-hidden="true">
        <div class="orbit-ring r1"></div>
        <div class="orbit-ring r2"></div>
        <div class="orbit-ring r3"></div>
        <span class="orbit-dot d1"></span>
        <span class="orbit-dot d2"></span>
        <span class="orbit-dot d3"></span>
      </div>

      <div class="absolute inset-0 grid-mask opacity-30 pointer-events-none"></div>
      <div class="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16">
        <p class="text-[12px] tracking-wider uppercase text-white/60 mb-4">+ Portfolio</p>
        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Empowering teams to ship<br/> better software, faster.
        </h1>
        <p class="mt-5 text-white/80 max-w-2xl text-lg">
          {{ resume.name }} — {{ resume.title }}.
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <span v-for="t in topTags" :key="t"
                class="chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">{{ t }}</span>
        </div>

        <!-- parallax showcase frame -->
        <div class="mt-12 rounded-3xl overflow-hidden border border-white/10 shadow-glass" data-parallax="y" data-speed="0.15">
          <div class="aspect-[16/7] bg-gradient-to-br from-white/5 to-white/0"></div>
        </div>
      </div>
    </section>
  `
};

/* -------------------- ABOUT -------------------- */
const AboutSection = {
  props: ['profile'],
  template: `
    <section v-if="profile && (profile.headline || profile.about)" id="about" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold">About</h2>
        <p v-if="profile.headline" class="text-white/90 mt-2">{{ profile.headline }}</p>
        <p v-if="profile.about" class="text-white/80 mt-4 max-w-3xl">{{ profile.about }}</p>
      </div>
    </section>
  `
};

/* -------------------- OVERVIEW -------------------- */
const Overview = {
  props: ['resume', 'topTags'],
  template: `
    <section id="overview" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Overview</h2>
        <p class="text-white/80 max-w-3xl">{{ resume.summary }}</p>

        <div class="mt-8 grid md:grid-cols-2 gap-4">
          <div class="glass rounded-2xl p-4">
            <div class="text-white/70 text-xs mb-2">Services</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in ['App Dev','Data Eng','DevOps','APIs','Cloud','Security']" :key="s"
                    class="chip rounded-full px-3 py-1.5 text-xs">{{ s }}</span>
            </div>
          </div>
          <div class="glass rounded-2xl p-4">
            <div class="text-white/70 text-xs mb-2">Tech I use</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="t in topTags" :key="t" class="chip rounded-full px-3 py-1.5 text-xs">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* -------------------- FEATURED -------------------- */
const FeaturedLinks = {
  props: ['items'],
  template: `
    <section v-if="items && items.length" id="featured" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold">Featured</h2>
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <a v-for="f in items" :key="f.title" :href="f.link" target="_blank" rel="noopener"
             class="rounded-2xl border border-white/8 bg-white/[.03] p-5 hover:bg-white/[.05] transition">
            <div class="text-sm text-white/60 uppercase tracking-wide">{{ f.type }}</div>
            <div class="mt-2 font-semibold">{{ f.title }}</div>
          </a>
        </div>
      </div>
    </section>
  `
};

/* -------------------- WORK -------------------- */
const Work = {
  props: ['experience'],
  template: `
    <section v-if="experience && experience.length" id="work" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <div class="flex items-end justify-between">
          <h2 class="text-2xl md:text-3xl font-bold">Selected work</h2>
        </div>

        <div class="mt-8 grid md:grid-cols-2 gap-6">
          <article v-for="exp in experience" :key="exp.company"
                   class="rounded-3xl border border-white/8 bg-white/[.03] hover:bg-white/[.05] transition shadow-glass p-6">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-lg font-semibold">{{ exp.company }}</h3>
              <span class="chip rounded-full px-3 py-1.5 text-[11px]">{{ exp.duration }}</span>
            </div>
            <p class="text-white/70 text-sm mt-1">{{ exp.role }}</p>
            <ul v-if="exp.achievements && exp.achievements.length" class="mt-4 space-y-2 text-[15px] leading-relaxed">
              <li v-for="a in exp.achievements.slice(0,4)" :key="a" class="pl-5 relative">
                <span class="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-brand-600 shadow-glow"></span>
                {{ a }}
              </li>
            </ul>
            <div v-if="exp.tech_stack && exp.tech_stack.length" class="mt-4 flex flex-wrap gap-2">
              <span v-for="t in exp.tech_stack.slice(0,8)" :key="t" class="chip rounded-full px-3 py-1.5 text-[11px]">{{ t }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  `
};

/* -------------------- TESTIMONIALS -------------------- */
const TestimonialsCarousel = {
  props: ['items'],
  data(){ return { i: 0 }; },
  computed:{ active(){ return this.items?.[this.i] || null; } },
  methods:{
    next(){ this.i = (this.i + 1) % this.items.length; this.$nextTick(()=> animateTestimonialSwap(this.$el)); },
    prev(){ this.i = (this.i - 1 + this.items.length) % this.items.length; this.$nextTick(()=> animateTestimonialSwap(this.$el)); }
  },
  template: `
    <section v-if="items && items.length" class="relative">
      <div class="max-w-4xl mx-auto px-6 py-12">
        <div class="rounded-3xl glass p-6 md:p-8">
          <p class="text-white/90 text-lg leading-relaxed min-h-[5.5rem]">
            “{{ active.quote }}”
          </p>
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center gap-3 text-sm text-white/70">
              <div class="w-8 h-8 rounded-full bg-white/10"></div>
              <div><span class="font-medium text-white/90">{{ active.author }}</span>, {{ active.role }}</div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="prev" class="chip rounded-xl px-3 py-1.5 text-xs">Prev</button>
              <button @click="next" class="chip rounded-xl px-3 py-1.5 text-xs">Next</button>
            </div>
          </div>
          <div class="mt-4 flex gap-1">
            <span v-for="(t,idx) in items" :key="idx"
                  class="h-1.5 w-6 rounded-full"
                  :class="idx===i ? 'bg-brand-600' : 'bg-white/20'"></span>
          </div>
        </div>
      </div>
    </section>
  `
};

/* -------------------- EDUCATION -------------------- */
const Education = {
  props: ['items'],
  template: `
    <section v-if="items && items.length" id="education" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold">Education</h2>
        <div class="mt-8 grid md:grid-cols-2 gap-6">
          <article v-for="ed in items" :key="ed.institution"
                   class="rounded-2xl border border-white/8 bg-white/[.03] p-6">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-lg font-semibold">{{ ed.institution }}</h3>
              <span v-if="ed.location" class="chip rounded-full px-3 py-1.5 text-[11px]">{{ ed.location }}</span>
            </div>
            <p class="text-white/80 mt-2">{{ ed.degree }}</p>
            <p v-if="ed.status" class="text-white/60 text-sm mt-1">{{ ed.status }}</p>
            <p v-if="ed.year_completed && !ed.status" class="text-white/60 text-sm mt-1">Completed: {{ ed.year_completed }}</p>
          </article>
        </div>
      </div>
    </section>
  `
};

/* -------------------- CERTIFICATIONS -------------------- */
const Certifications = {
  props: ['items'],
  template: `
    <section v-if="items && items.length" id="certs" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold">Certifications</h2>
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div v-for="c in items" :key="c.name" class="rounded-2xl border border-white/8 bg-white/[.03] p-5">
            <div class="font-semibold">{{ c.name }}</div>
            <div class="text-white/70 text-sm mt-1">{{ c.issuer }}<span v-if="c.year"> • {{ c.year }}</span></div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* -------------------- COURSES -------------------- */
const CoursesList = {
  props: ['items'],
  template: `
    <section v-if="items && items.length" id="courses" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold">Courses</h2>
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div v-for="c in items" :key="c.name" class="rounded-2xl border border-white/8 bg-white/[.03] p-5">
            <div class="font-semibold">{{ c.name }}</div>
            <div class="text-white/70 text-sm mt-1">{{ c.platform }}</div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* -------------------- SKILLS GRID (LinkedIn) -------------------- */
const SkillsGrid = {
  props: ['skills'],
  computed:{
    chunks(){
      const s = this.skills || [];
      const size = 18; // 3 cols × 6 rows
      const first = s.slice(0, size);
      return [
        first.slice(0, 6),
        first.slice(6, 12),
        first.slice(12, 18)
      ];
    }
  },
  template: `
    <section v-if="skills && skills.length" id="skills" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold">Skills</h2>
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div v-for="(col, i) in chunks" :key="i" class="rounded-2xl border border-white/8 bg-white/[.03] p-5">
            <div class="flex flex-wrap gap-2">
              <span v-for="s in col" :key="s" class="chip rounded-full px-3 py-1.5 text-xs">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* -------------------- CAPABILITIES (from core_competencies) -------------------- */
const Capabilities = {
  props: ['groups'],
  template: `
    <section v-if="groups && Object.keys(groups).length" id="capabilities" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold">Capabilities</h2>
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div v-for="(group, key) in groups" :key="key"
               class="rounded-2xl border border-white/8 bg-white/[.03] p-5">
            <h3 class="font-semibold capitalize">{{ key.replace('_',' ').replace('nlp','& NLP') }}</h3>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="s in group" :key="s" class="chip rounded-full px-3 py-1.5 text-xs">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* -------------------- ADDITIONAL TOOLS -------------------- */
const AdditionalTools = {
  props: ['tools'],
  computed:{
    groups(){
      return Object.entries(this.tools || {}).map(([key, val]) => ({
        title: key.replace(/_/g,' ').replace(/\b(\w)/g, s => s.toUpperCase()),
        items: val || []
      }));
    }
  },
  template: `
    <section v-if="groups.length" id="tools" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-14 md:py-20 angled-wrap">
        <div class="angled-wipe"></div>
        <h2 class="text-2xl md:text-3xl font-bold">Additional tools & integrations</h2>
        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div v-for="g in groups" :key="g.title" class="rounded-2xl border border-white/8 bg-white/[.03] p-5">
            <h3 class="font-semibold">{{ g.title }}</h3>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="s in g.items" :key="s" class="chip rounded-full px-3 py-1.5 text-xs">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

/* -------------------- CONTACT / FOOTER -------------------- */
const ContactSection = {
  props: ['email','linkedin'],
  template: `
    <section id="contact" class="relative">
      <div class="max-w-7xl mx-auto px-6 py-16 md:py-24 angled-wrap">
        <div class="angled-wipe"></div>
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-extrabold leading-tight">Let’s build the future together</h2>
            <p class="mt-4 text-white/75">Email me and we’ll discuss your product roadmap.</p>
            <div class="mt-6 flex gap-3">
              <a :href="'mailto:'+email" class="inline-flex items-center rounded-xl px-5 py-3 bg-brand-600 hover:bg-brand-700 font-semibold shadow-glow">
                Email {{ email }}
              </a>
              <a :href="linkedin" target="_blank" class="inline-flex items-center rounded-xl px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/10">LinkedIn</a>
            </div>
          </div>
          <div class="glass rounded-2xl p-6">
            <label class="block text-sm mb-1 text-white/80">Subject</label>
            <input class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2" placeholder="Project inquiry">
            <label class="block text-sm mt-4 mb-1 text-white/80">Message</label>
            <textarea rows="5" class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2" placeholder="Tell me about your project..."></textarea>
            <p class="text-xs text-white/50 mt-3">Static demo for GitHub Pages — use the email button to contact.</p>
          </div>
        </div>
      </div>
    </section>
  `
};

const SiteFooter = {
  template: `
    <footer class="border-t border-white/5">
      <div class="max-w-7xl mx-auto px-6 py-10 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© <span>{{ new Date().getFullYear() }}</span> Muhammad Khizar Bajwa</p>
        <p>Personal-use license only. No code reuse.</p>
      </div>
    </footer>
  `
};

export {
  Hero, AboutSection, Overview, FeaturedLinks, Work, TestimonialsCarousel,
  Education, Certifications, CoursesList, SkillsGrid,
  Capabilities, AdditionalTools, ContactSection, SiteFooter
};
