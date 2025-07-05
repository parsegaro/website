import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './SinglePostPage.module.css';
import { motion, useAnimation } from 'framer-motion';
// Re-using blogPostsData from BlogListPage for simplicity in this example
// In a real app, you might fetch this data or have a shared data module

// Placeholder data (copied from BlogListPage for standalone use here, or import if modularized)
const placeholderBlogImageUrl1 = 'https://via.placeholder.com/800x400/40E0D0/FFFFFF?text=مقاله+وبلاگ+۱';
const placeholderBlogImageUrl2 = 'https://via.placeholder.com/800x400/48D1CC/FFFFFF?text=مقاله+وبلاگ+۲';
const placeholderBlogImageUrl3 = 'https://via.placeholder.com/800x400/00CED1/FFFFFF?text=مقاله+وبلاگ+۳';

const blogPostsData = [
  {
    id: "importance-of-regular-checkups",
    title: "اهمیت چکاپ‌های منظم پزشکی",
    author: "دکتر علی رضایی",
    date: "۱۴ تیر ۱۴۰۳",
    imageUrl: placeholderBlogImageUrl1,
    category: "سلامت عمومی",
    content: `
      <p>چکاپ‌های منظم پزشکی یکی از ارکان اصلی حفظ سلامتی و پیشگیری از بیماری‌ها به شمار می‌روند. بسیاری از بیماری‌ها در مراحل اولیه علائم چندانی ندارند و تنها از طریق معاینات دوره‌ای و آزمایش‌های غربالگری قابل تشخیص هستند. تشخیص زودهنگام، شانس درمان موفقیت‌آمیز را به طور چشمگیری افزایش می‌دهد و از بروز عوارض جدی‌تر جلوگیری می‌کند.</p>
      <p>متخصصان توصیه می‌کنند که افراد بزرگسال حداقل سالی یک بار برای چکاپ عمومی به پزشک مراجعه کنند. این مراجعات شامل بررسی فشار خون، قند خون، چربی خون، و معاینات فیزیکی عمومی است. بسته به سن، جنسیت، و سابقه خانوادگی، ممکن است آزمایش‌های تکمیلی مانند ماموگرافی، پاپ اسمیر، تست تراکم استخوان، یا کولونوسکوپی نیز توصیه شود.</p>
      <h3>چرا چکاپ منظم مهم است؟</h3>
      <ul>
        <li><strong>تشخیص زودهنگام بیماری‌ها:</strong> شناسایی بیماری‌هایی مانند دیابت، فشار خون بالا، بیماری‌های قلبی و انواع سرطان در مراحل اولیه.</li>
        <li><strong>پیشگیری از بروز بیماری‌ها:</strong> با شناسایی عوامل خطر و ارائه مشاوره‌های لازم برای تغییر سبک زندگی.</li>
        <li><strong>مدیریت بهتر بیماری‌های مزمن:</strong> کنترل و پایش بیماری‌های موجود برای جلوگیری از پیشرفت آن‌ها.</li>
        <li><strong>کاهش هزینه‌های درمانی:</strong> درمان بیماری‌ها در مراحل اولیه معمولاً کم‌هزینه‌تر و ساده‌تر است.</li>
      </ul>
      <p>به یاد داشته باشید که سرمایه‌گذاری روی سلامتی، بهترین سرمایه‌گذاری است. با پزشک خود در مورد برنامه چکاپ مناسب برای شما مشورت کنید.</p>
    `
  },
  {
    id: "understanding-ibs",
    title: "همه چیز درباره سندرم روده تحریک‌پذیر (IBS)",
    author: "دکتر مریم احمدی",
    date: "۱۰ تیر ۱۴۰۳",
    imageUrl: placeholderBlogImageUrl2,
    category: "بیماری‌های گوارشی",
    content: `
      <p>سندرم روده تحریک‌پذیر (Irritable Bowel Syndrome - IBS) یک اختلال شایع گوارشی است که با علائمی مانند درد شکم، نفخ، اسهال و یا یبوست مشخص می‌شود. این بیماری می‌تواند کیفیت زندگی افراد را تحت تاثیر قرار دهد، اما با مدیریت صحیح علائم، می‌توان به زندگی عادی ادامه داد.</p>
      <p>علت دقیق IBS هنوز به طور کامل شناخته نشده است، اما عواملی مانند استرس، تغییرات هورمونی، برخی غذاها و عفونت‌های گوارشی می‌توانند در بروز یا تشدید علائم نقش داشته باشند. تشخیص IBS معمولاً بر اساس شرح حال بیمار و رد سایر بیماری‌های گوارشی با علائم مشابه صورت می‌گیرد.</p>
      <h3>روش‌های مدیریت IBS:</h3>
      <ul>
        <li><strong>تغییرات رژیم غذایی:</strong> شناسایی و حذف غذاهای محرک (مانند غذاهای چرب، کافئین، برخی کربوهیدرات‌ها - FODMAPs).</li>
        <li><strong>مدیریت استرس:</strong> استفاده از تکنیک‌های آرام‌سازی مانند یوگا، مدیتیشن و ورزش منظم.</li>
        <li><strong>دارو درمانی:</strong> استفاده از داروهای ضد اسپاسم، ضد اسهال، ملین‌ها یا داروهای تنظیم‌کننده عملکرد روده تحت نظر پزشک.</li>
        <li><strong>پروبیوتیک‌ها:</strong> برخی مطالعات نشان داده‌اند که پروبیوتیک‌ها می‌توانند به بهبود علائم IBS کمک کنند.</li>
      </ul>
      <p>اگر علائم IBS را تجربه می‌کنید، حتماً با پزشک متخصص گوارش مشورت کنید تا بهترین برنامه درمانی برای شما تنظیم شود.</p>
    `
  },
  {
    id: "heart-healthy-diet-tips",
    title: "نکات کلیدی برای داشتن یک رژیم غذایی دوستدار قلب",
    author: "تیم تغذیه کلینیک",
    date: "۵ تیر ۱۴۰۳",
    imageUrl: placeholderBlogImageUrl3,
    category: "تغذیه و سلامت",
    content: `
      <p>بیماری‌های قلبی-عروقی یکی از اصلی‌ترین دلایل مرگ و میر در سراسر جهان هستند. خوشبختانه، با اتخاذ یک سبک زندگی سالم، از جمله رژیم غذایی مناسب، می‌توان تا حد زیادی از بروز این بیماری‌ها پیشگیری کرد.</p>
      <h3>اصول رژیم غذایی سالم برای قلب:</h3>
      <ul>
        <li><strong>مصرف میوه‌ها و سبزیجات:</strong> حداقل ۵ واحد میوه و سبزی در روز به دلیل داشتن فیبر، ویتامین‌ها و آنتی‌اکسیدان‌ها.</li>
        <li><strong>انتخاب غلات کامل:</strong> جایگزین کردن نان سفید و برنج سفید با نان سبوس‌دار، جو دوسر و برنج قهوه‌ای.</li>
        <li><strong>محدود کردن چربی‌های اشباع و ترانس:</strong> کاهش مصرف گوشت قرمز پرچرب، کره، روغن‌های جامد و غذاهای فرآوری شده.</li>
        <li><strong>استفاده از چربی‌های سالم:</strong> مصرف منابع چربی‌های غیراشباع مانند روغن زیتون، آووکادو، مغزها و ماهی‌های چرب (سالمون، ساردین).</li>
        <li><strong>کاهش مصرف نمک (سدیم):</strong> برای کنترل فشار خون.</li>
        <li><strong>محدود کردن قندهای افزوده:</strong> پرهیز از نوشابه‌ها، شیرینی‌جات و دسرهای پرشکر.</li>
        <li><strong>کنترل حجم وعده‌های غذایی:</strong> برای جلوگیری از اضافه وزن.</li>
      </ul>
      <p>مشاوره با یک متخصص تغذیه می‌تواند به شما در تنظیم یک برنامه غذایی شخصی‌سازی شده و متناسب با نیازهایتان کمک کند.</p>
    `
  }
];


const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const currentPost = blogPostsData.find(p => p.id === postId);
    setPost(currentPost);
    window.scrollTo(0, 0);
  }, [postId]);

  useEffect(() => {
    if (inView && post) { // Animate only when post data is loaded and in view
      controls.start('visible');
    }
  }, [controls, inView, post]);

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (!post) {
    return (
      <div className={styles.loadingContainer}>
        <p>در حال بارگذاری مقاله...</p>
        {/* You can add a spinner animation here later */}
      </div>
    );
  }

  return (
    <motion.div
      className={styles.singlePostPage}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={pageVariants}
    >
      <div className={styles.postHeader}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postMeta}>
          توسط: {post.author} | تاریخ: {post.date}
          {post.category && ` | دسته‌بندی: ${post.category}`}
        </p>
      </div>

      {post.imageUrl && (
        <div className={styles.postImageContainer}>
          <img src={post.imageUrl} alt={post.title} className={styles.postImage} loading="lazy" />
        </div>
      )}

      <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className={styles.backLinkContainer}>
        <Link to="/blog" className={styles.backLink}>&laquo; بازگشت به لیست مقالات</Link>
      </div>
    </motion.div>
  );
};

export default SinglePostPage;
