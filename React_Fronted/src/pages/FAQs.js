import React, { useState } from "react";
import "./FAQs.css"; // Import the CSS file

const FAQs = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What is cervical cancer?",
      answer:
        "Cervical cancer is a type of cancer that occurs in the cells of the cervix, which is the lower part of the uterus that connects to the vagina. The cervix plays a crucial role in childbirth by allowing the passage of the baby from the uterus to the vagina.",
    },
    {
      question: "What causes cervical cancer?",
      answer:
        "Cervical cancer is primarily caused by persistent infection with certain types of the human papillomavirus (HPV). HPV is a group of viruses that can infect the genital area, as well as the mouth and throat. However, not all HPV infections lead to cervical cancer; in many cases, the immune system can clear the virus without causing any problems.",
    },
    {
      question:
        "What type of doctor should I see if I think I have cervical cancer?",
      answer:
        "If you suspect that you may have cervical cancer or if you are experiencing symptoms associated with cervical cancer, you should promptly consult with a healthcare professional. The type of doctor you should see for the evaluation, diagnosis, and treatment of cervical cancer typically includes.",
      subAnswers: [
        "1.Gynecologist: A gynecologist is a doctor who specializes in women's reproductive health, including the female reproductive system and related issues. Gynecologists often perform pelvic examinations, Pap smears, and other tests related to cervical health.",
        "2.Oncologist:In some cases, especially if the cancer has spread or if a gynecologic oncologist is not readily available, you may be referred to a general oncologist. Oncologists are doctors who specialize in the diagnosis and treatment of cancer.",
      ],
    },
    {
      question: "What if I don’t want cancer treatment?",
      answer:
        "If you have been diagnosed with cancer but do not want to pursue treatment, it's important to communicate your preferences and concerns with your healthcare team. While cancer treatment can be effective and life-saving, decisions about your care ultimately rest with you. Here are some steps you might consider:",
      subAnswers: [
        "1.Open Communication: Have an open and honest discussion with your healthcare team about your feelings and concerns. Share your reasons for not wanting treatment, and make sure your healthcare providers understand your perspective.",
        "2.Understand the Consequences: Your healthcare team can provide information about the potential consequences of not receiving treatment. Understanding the likely course of the disease without treatment can help you make an informed decision",
        "3.Explore Palliative Care: Even if you choose not to pursue curative treatment, you may want to consider palliative care. Palliative care focuses on relieving symptoms and improving the quality of life for individuals facing serious illnesses. It does not aim to cure the disease but can provide comfort and support.",
        "4.Legal and Ethical Considerations: Depending on your location, there may be legal and ethical considerations related to refusing treatment for a life-threatening condition. Consult with legal and ethical experts to understand the implications and ensure your wishes are respected.",
      ],
    },
    {
      question:
        "Will my Cervical cancer treatment affect my ability to have a baby?",
      answer:
        "Early-stage cervical cancer can often be treated with surgery that preserves fertility. However, if you need a hysterectomy or radiation, you may not be able to get pregnant. Radiotherapy can affect the womb, making it impossible to have children.",
    },
    {
      question: "Can physical activity reduce the risk of cervical cancer",
      answer:
        "Your medical provider can give guidance on what is best for your situation. This information does not constitute medical advice or diagnosis",
    },
    {
      question: "can a healthy diet help to prevent cervical cancer?",
      answer:
        "A diet that is high in antioxidants, carotenoids, flavonoids and folate – all of which are found in fruits and vegetables – can help the body fight off HPV and also prevent an HPV infection from transforming cervical cells into cancerous lesions.",
    },
    {
      question:
        "Does a family history of cervical cancer put someone at a higher risk?",
      answer:
        "Cervical cancer may run in some families. If your mother or sister had cervical cancer, your chances of developing the disease are higher than if no one in the family had it.",
    },

    // Add more FAQs here...
  ]);

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="faq-container">
      {" "}
      {/* Added a container class */}
      <h2>FAQs</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq" key={index}>
            <a onClick={() => toggleFaq(index)} className="faq-question">
              {faq.question}
              {openFaq === index && <span className="icon">–</span>}
              {openFaq !== index && <span className="icon">+</span>}
            </a>
            {openFaq === index && (
              <div className="faq-answer">
                {faq.answer}
                {faq.subAnswers && (
                  <ul>
                    {faq.subAnswers.map((subAnswer, subIndex) => (
                      <li key={subIndex}>{subAnswer}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
