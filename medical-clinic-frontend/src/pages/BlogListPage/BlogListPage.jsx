import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogListPage.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Placeholder data for blog posts
const placeholderBlogImageUrl1 = 'https://via.placeholder.com/400x250/40E0D0/FFFFFF?text=مقاله+وبلاگ+۱';
const placeholderBlogImageUrl2 = 'https://via.placeholder.com/400x250/48D1CC/FFFFFF?text=مقاله+وبلاگ+۲';
const placeholderBlogImageUrl3 = 'https://via.placeholder.com/400x250/00CED1/FFFFFF?text=مقاله+وبلاگ+۳';

const blogPostsData = [
  {
    id: "importance-of-regular-checkups",
    title: "اهمیت چکاپ‌های منظم پزشکی",
    author: "دکتر علی رضایی",
    date: "۱۴ تیر ۱۴۰۳",
    imageUrl: placeholderBlogImageUrl1,
    excerpt: "چکاپ‌های منظم پزشکی نقش کلیدی در تشخیص زودهنگام بیماری‌ها و حفظ سلامت عمومی دارند. در این مقاله به بررسی دلایل اهمیت این مراجعات و آزمایش‌های معمول می‌پردازیم...",
    category: "سلامت عمومی"
  },
  {
    id: "understanding-ibs",
    title: "همه چیز درباره سندرم روده تحریک‌پذیر (IBS)",
    author: "دکتر مریم احمدی",
    date: "۱۰ تیر ۱۴۰۳",
    imageUrl: placeholderBlogImageUrl2,
    excerpt: "سندرم روده تحریک‌پذیر یکی از شایع‌ترین اختلالات گوارشی است. علائم، دلایل و روش‌های مدیریت آن را در این مطلب بخوانید...",
    category: "بیماری‌های گوارشی"
  },
  {
    id: "heart-healthy-diet-tips",
    title: "نکات کلیدی برای داشتن یک رژیم غذایی دوستدار قلب",
    author: "تیم تغذیه کلینیک",
    date: "۵ تیر ۱۴۰۳",
    imageUrl: placeholderBlogImageUrl3,
    excerpt: "تغذیه مناسب یکی از مهم‌ترین عوامل در پیشگیری از بیماری‌های قلبی است. با رعایت این نکات ساده، سلامت قلب خود را تضمین کنید...",
    category: "تغذیه و سلامت"
  },
  // Add more blog posts as needed
];

const BlogListPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    window.scrollTo(0, 0);
  }, [controls, inView]);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={styles.blogListPage}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={pageVariants}
    >
      <div className={styles.pageHeader}>
        <motion.h1 variants={itemVariants}>وبلاگ سلامت</motion.h1>
        <motion.p variants={itemVariants} className={styles.pageSubtitle}>
          آخرین مقالات و نکات پزشکی از متخصصین ما.
        </motion.p>
      </div>

      <div className={styles.blogGridContainer}>
        {blogPostsData.map(post => (
          <motion.div key={post.id} className={styles.blogCard} variants={itemVariants}>
            <Link to={`/blog/${post.id}`} className={styles.cardLinkWrapper}>
              <div className={styles.blogCardImageContainer}>
                <img src={post.imageUrl} alt={post.title} className={styles.blogCardImage} loading="lazy" />
                {post.category && <span className={styles.categoryTag}>{post.category}</span>}
              </div>
              <div className={styles.blogCardContent}>
                <h2 className={styles.blogTitle}>{post.title}</h2>
                <p className={styles.blogMeta}>
                  توسط: {post.author} | تاریخ: {post.date}
                </p>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                <span className={styles.readMoreLink}>ادامه مطلب &raquo;</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogListPage;
