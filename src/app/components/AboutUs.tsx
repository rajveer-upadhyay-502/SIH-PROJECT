// components/AboutUs.tsx
import React from "react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      gap: "2rem",
      flexWrap: "wrap",
    },
    textSection: {
      flex: 1,
      minWidth: "300px",
    },
    heading: {
      fontSize: "2.5rem",
      marginBottom: "1rem",
    },
    paragraph: {
      fontSize: "1.1rem",
      lineHeight: 1.6,
      marginBottom: "1rem",
      color: "#888",
    },
    imageSection: {
      flex: 1,
      minWidth: "300px",
      textAlign: "center",
    },
    image: {
      borderRadius: "8px",
      objectFit: "cover",
      maxWidth: "100%",
      height: "auto",
    },
  };

  return (
    <section style={styles.container}>
      <div style={styles.textSection}>
        <h2 style={styles.heading}>About Us</h2>
        <p style={styles.paragraph}>
          We are a team of educators, technologists, and problem-solvers
          committed to transforming how higher education institutions manage
          class scheduling. Recognizing the growing complexity in academic
          timetabling — from limited infrastructure and faculty availability to
          elective overlaps and multidisciplinary course structures — we aim to
          provide intelligent, adaptive, and conflict-free scheduling solutions.
         
        </p>
        <p style={styles.paragraph}>
        Our platform addresses the critical inefficiencies of manual timetable
          preparation, which often leads to class clashes, underutilized
          classrooms, and uneven faculty workloads. With the implementation of
          NEP 2020 and the shift towards flexible, student-centric learning,
          traditional scheduling methods fall short in meeting institutional
          needs. We step in to bridge this gap. Using data-driven algorithms and
          smart optimization techniques, our system ensures seamless scheduling
          that aligns with institutional policies, academic requirements, and
          resource constraints — all while improving the academic experience for
          students and faculty alike. At the core of our mission is a simple
          belief: Better schedules create better learning environments.
        </p>
      </div>
      <div style={styles.imageSection}>
        <Image
          src="/team.jpg"
          alt="Our team"
          width={500}
          height={350}
          style={styles.image}
        />
      </div>
    </section>
  );
};

export default AboutUs;
