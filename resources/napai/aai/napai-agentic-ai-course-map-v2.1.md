# NAPAI Agentic AI 課程地圖 v2.1

**更新日期**：2026-01-25  
**編制單位**：國家智慧代理與實體AI機器人課程推動計畫辦公室（NAPAI）  
**適用對象**：教育工作者、AI 學習者、AI 開發者、政策規劃者 
**線上最新版**：https://napaincu.github.io/

---

## 一、課程地圖說明（Purpose & Scope）

本課程地圖提供一套系統化、可擴充、與國際接軌的 **Agentic AI 學習路徑**，協助學習者由基礎能力逐步進入多代理系統、治理與實務部署。

**設計原則**：
- 由「基礎能力 -> 核心概念 -> 系統實作 -> 治理與風險 -> 產業應用」逐層遞進
- 每一子主題至少搭配：
  - 一個國際知名教育平台
  - 一個雲端或工具平台
  - 一個學術或研究型來源

---

## 二、資源選擇方法論（Methodology）

本課程地圖所列資源係依下列準則篩選：

1. **可信度（Trustworthiness）** - 來源為具國際聲譽之機構（如：DeepLearning.AI、Microsoft、Nvidia、Google、AWS、Stanford、Harvard、MIT、CMU、Berkeley 等）
   - 具明確作者或單位背書

2. **權威性（Authoritativeness）** - 為官方訓練資源、學術課程、或主流平台學習路徑
   - 被學界或業界廣泛引用

3. **專業度（Expertise）** - 課程內容具技術深度或實務導向
   - 可對應實際系統開發或政策應用

4. **實用性（Experience）** - 經實際教學或專案驗證可行
   - 可快速導入教育場域

---

## 三、快速導覽（Table of Contents）

- [1. Foundations (基礎能力)](#1-foundations)
- [2. LLM Fundamentals (大型語言模型基礎)](#2-llm-fundamentals)
- [3. Core Agent Concepts (核心 Agent 概念)](#3-core-agent-concepts)
- [4. Tool Use & Function Calling (工具使用與函數呼叫)](#4-tool-use--function-calling)
- [5. Memory & RAG Systems (記憶與檢索增強生成)](#5-memory--rag-systems)
- [6. Frameworks & Implementation (框架與實作)](#6-frameworks--implementation)
- [7. Multi-Agent Systems (多智慧代理系統)](#7-multi-agent-systems)
- [8. Evaluation, Safety & Governance (評估、安全與治理)](#8-evaluation-safety--governance)
- [9. Production & Capstone (生產與專題)](#9-production--capstone)
- [10. Advanced Topics (進階主題)](#10-advanced-topics)

---

## 四、課程主題地圖（Course Map）

> 標註說明：🟢 入門　🟡 進階　🔴 專業

### 1. Foundations

#### 1-1 Python programming 🟢
**學習目標**：掌握開發 AI 應用所需的 Python 程式語言基礎與環境架設。
**適用情境**：撰寫自動化腳本、處理數據資料。

- DeepLearning.AI – AI Python for Beginners  
  https://www.deeplearning.ai/short-courses/ai-python-for-beginners/
- Microsoft – Generative AI for Beginners  
  https://github.com/microsoft/generative-ai-for-beginners
- Nvidia – Fundamentals of Deep Learning  
  https://www.nvidia.com/en-eu/training/instructor-led-workshops/fundamentals-of-deep-learning/
- Google – Introduction to Generative AI  
  https://www.cloudskillsboost.google/paths/118
- AWS – Building GenAI Apps with Bedrock  
  https://skillbuilder.aws/generative-ai
- Academic – Harvard CS50 Python  
  https://cs50.harvard.edu/python/

#### 1-2 API integration and data handling 🟢
**學習目標**：學會呼叫 LLM API 並處理輸入輸出的資料格式（JSON 等）。
**適用情境**：開發簡易聊天機器人、串接第三方服務。

- DeepLearning.AI – Building Systems with ChatGPT API  
  https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/
- Microsoft – Generative AI for Beginners  
  https://github.com/microsoft/generative-ai-for-beginners
- Nvidia – Deep Learning Institute  
  https://www.nvidia.com/en-us/training/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – Amazon Bedrock Getting Started  
  https://www.coursera.org/learn/amazon-bedrock-getting-started
- Academic – MIT OpenCourseWare  
  https://ocw.mit.edu/

#### 1-3 Machine Learning fundamentals 🟢
**學習目標**：理解機器學習的核心概念、演算法與運作原理。
**適用情境**：數據分析、預測模型建立。

- DeepLearning.AI – Machine Learning Specialization  
  https://www.deeplearning.ai/courses/machine-learning-specialization/
- Microsoft – AI For Beginners  
  https://github.com/microsoft/AI-For-Beginners
- Nvidia – Fundamentals of Deep Learning  
  https://www.nvidia.com/en-eu/training/instructor-led-workshops/fundamentals-of-deep-learning/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS ML Learning Path  
  https://aws.amazon.com/training/learn-about/machine-learning/
- Academic – Stanford CS229 ML  
  https://cs229.stanford.edu/

#### 1-4 Model training, evaluation, and bias 🟢
**學習目標**：學習模型訓練流程、成效評估指標及如何識別偏差。
**適用情境**：優化模型準確度、確保 AI 系統公平性。

- DeepLearning.AI – Machine Learning Specialization  
  https://www.deeplearning.ai/courses/machine-learning-specialization/
- Microsoft – AI For Beginners  
  https://github.com/microsoft/AI-For-Beginners
- Nvidia – Fundamentals of Deep Learning  
  https://www.nvidia.com/en-eu/training/instructor-led-workshops/fundamentals-of-deep-learning/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS ML Training  
  https://aws.amazon.com/training/learn-about/machine-learning/
- Academic – MIT 6.036 Intro to ML  
  https://openlearninglibrary.mit.edu/courses/course-v1:MITx+6.036+1T2019/about

#### 1-5 Essential math for AI 🟢
**學習目標**：補強線性代數、微積分與機率統計等 AI 數學基礎。
**適用情境**：研讀 AI 論文、理解演算法底層邏輯。

- DeepLearning.AI – Mathematics for ML Specialization  
  https://www.deeplearning.ai/courses/mathematics-for-machine-learning-and-data-science-specialization/
- Microsoft – AI For Beginners  
  https://github.com/microsoft/AI-For-Beginners
- Nvidia – Deep Learning Institute  
  https://www.nvidia.com/en-us/training/
- Google – Google Cloud Skills Boost  
  https://www.cloudskillsboost.google/
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/
- Academic – MIT 18.06 Linear Algebra  
  https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/

---

### 2. LLM Fundamentals

#### 2-1 Foundations of large language models 🟡
**學習目標**：理解 LLM 的發展歷史、能力範疇與基本限制。
**適用情境**：評估導入 LLM 的可行性與選擇合適模型。

- DeepLearning.AI – Generative AI with LLMs  
  https://www.deeplearning.ai/courses/generative-ai-with-llms/
- Microsoft – Generative AI for Beginners  
  https://github.com/microsoft/generative-ai-for-beginners
- Nvidia – Generative AI LLMs Certification  
  https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-associate/
- Google – Introduction to Generative AI  
  https://www.cloudskillsboost.google/paths/118
- AWS – AWS GenAI Developers Certificate  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Stanford CS324 LLMs  
  https://stanford-cs324.github.io/winter2022/

#### 2-2 Transformer architecture 🟡
**學習目標**：深入理解 Transformer 架構及其 Attention 機制。
**適用情境**：閱讀技術文獻、進行模型架構優化。

- DeepLearning.AI – How Transformer LLMs Work  
  https://www.deeplearning.ai/short-courses/how-transformer-llms-work/
- Microsoft – Generative AI for Beginners  
  https://github.com/microsoft/generative-ai-for-beginners
- Nvidia – Generative AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-professional/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS GenAI Learning  
  https://skillbuilder.aws/generative-ai
- Academic – Stanford CME295 Transformers  
  https://cme295.stanford.edu/

#### 2-3 Prompt engineering 🟢
**學習目標**：掌握提示詞設計技巧以引導模型產出高品質結果。
**適用情境**：優化使用者互動體驗、提升任務完成率。

- DeepLearning.AI – ChatGPT Prompt Engineering  
  https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/
- Microsoft – Generative AI for Beginners  
  https://github.com/microsoft/generative-ai-for-beginners
- Nvidia – Generative AI LLM Learning Path  
  https://www.nvidia.com/en-us/learn/learning-path/generative-ai-llm/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS Bedrock Training  
  https://skillbuilder.aws/generative-ai
- Academic – Harvard CS50 AI  
  https://cs50.harvard.edu/ai/

#### 2-4 Model adaptation and tuning 🔴
**學習目標**：學習微調（Fine-tuning）技術以適應特定領域任務。
**適用情境**：建立法律、醫療等專業領域的專屬模型。

- DeepLearning.AI – Finetuning Large Language Models  
  https://www.deeplearning.ai/short-courses/finetuning-large-language-models/
- Microsoft – Generative AI for Beginners  
  https://github.com/microsoft/generative-ai-for-beginners
- Nvidia – Generative AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-professional/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS GenAI Developers Certificate  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – CMU LLM Certificate  
  https://www.cmu.edu/online/gai-llm/curriculum/index.html

#### 2-5 Evaluation of LLM behavior 🟡
**學習目標**：建立評估框架以測試 LLM 的準確性與一致性。
**適用情境**：模型上線前的品質保證（QA）與基準測試。

- DeepLearning.AI – Evaluating and Debugging GenAI  
  https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/
- Microsoft – Generative AI for Beginners  
  https://github.com/microsoft/generative-ai-for-beginners
- Nvidia – Generative AI LLM Learning Path  
  https://www.nvidia.com/en-us/learn/learning-path/generative-ai-llm/
- Google – Google Cloud Skills Boost  
  https://www.cloudskillsboost.google/
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – Berkeley CS188 AI  
  https://inst.eecs.berkeley.edu/~cs188/

#### 2-6 Role of LLMs in agent systems 🟡
**學習目標**：理解 LLM 在代理系統中作為「大腦」的決策角色。
**適用情境**：設計能夠自主規劃任務的 Agent 系統。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Agentic AI Learning Plan  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley LLM Agents MOOC  
  https://llmagents-learning.org/f24

---

### 3. Core Agent Concepts

#### 3-1 What defines an agent 🟡
**學習目標**：明確定義 Agent 與傳統 Chatbot 的差異及其自主性特徵。
**適用情境**：Agentic AI 產品定義與架構規劃。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.skills.google/course_templates/1267
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Stanford CS329A Self-Improving AI  
  https://cs329a.stanford.edu/

#### 3-2 Agent architectures 🟡
**學習目標**：掌握 ReAct、Chain of Thought 等常見 Agent 架構設計模式。
**適用情境**：系統架構設計與選型。

- DeepLearning.AI – AI Agentic Design Patterns with AutoGen  
  https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Build GenAI Agents with Vertex AI  
  https://www.skills.google/course_templates/1162
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley Agentic AI  
  https://rdi.berkeley.edu/agentic-ai/f25

#### 3-3 Reasoning and decision-making 🔴
**學習目標**：強化 Agent 的邏輯推論與多步驟決策能力。
**適用情境**：處理複雜且非線性的任務流程。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Agentic AI Learning  
  https://skillbuilder.aws/generative-ai
- Academic – Stanford Online Agentic AI  
  https://online.stanford.edu/enhancing-your-understanding-agentic-ai-practical-guide

#### 3-4 Planning mechanisms 🔴
**學習目標**：學習如何讓 Agent 進行任務拆解與執行路徑規劃。
**適用情境**：專案管理自動化、複雜行程規劃。

- DeepLearning.AI – AI Agents in LangGraph  
  https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley Advanced LLM Agents  
  https://rdi.berkeley.edu/adv-llm-agents/sp25

#### 3-5 Feedback and self-correction 🔴
**學習目標**：實作 Agent 的自我反思與錯誤修正機制。
**適用情境**：提升系統的穩健性與容錯率。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Gen AI Agents Course  
  https://www.skills.google/course_templates/1267
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – Stanford CS329A  
  https://online.stanford.edu/courses/cs329a-self-improving-ai-agents

#### 3-6 Agent limitations and failure modes 🟡
**學習目標**：識別 Agent 的幻覺、迴圈錯誤等常見失效模式。
**適用情境**：風險評估與防護機制設計。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Bedrock Training  
  https://skillbuilder.aws/generative-ai
- Academic – Berkeley LLM Agents  
  https://llmagents-learning.org/f24

#### 3-7 Long-horizon autonomy (conceptual) 🔴
**學習目標**：探討 Agent 執行長週期任務的挑戰與解決方案。
**適用情境**：自主研究助理、長期專案監控。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.skills.google/course_templates/1267
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Stanford CS329A  
  https://cs329a.stanford.edu/

---

### 4. Tool Use & Function Calling

#### 4-1 Tool-augmented agent design 🟡
**學習目標**：設計能有效利用外部工具的 Agent 系統。
**適用情境**：擴充 LLM 能力（如計算機、搜尋引擎）。

- DeepLearning.AI – Functions, Tools and Agents with LangChain  
  https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Build GenAI Agents with Vertex AI  
  https://www.skills.google/course_templates/1162
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley Agentic AI  
  https://rdi.berkeley.edu/agentic-ai/f25

#### 4-2 Function calling mechanisms 🟡
**學習目標**：深入理解函數呼叫的技術細節與參數傳遞。
**適用情境**：精確控制 API 互動。

- DeepLearning.AI – Functions, Tools and Agents with LangChain  
  https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Bedrock Training  
  https://skillbuilder.aws/generative-ai
- Academic – Berkeley LLM Agents MOOC  
  https://llmagents-learning.org/f24

#### 4-3 Custom tool development 🔴
**學習目標**：開發客製化工具供 Agent 調用以滿足特定業務需求。
**適用情境**：企業內部系統整合。

- DeepLearning.AI – AI Agents in LangGraph  
  https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://developer.nvidia.com/nemo-agent-toolkit
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley Advanced LLM Agents  
  https://llmagents-learning.org/sp25

#### 4-4 Tool orchestration and workflows 🔴
**學習目標**：學習編排多工具協作的流程與邏輯。
**適用情境**：複雜業務流程自動化。

- DeepLearning.AI – AI Agents in LangGraph  
  https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Build GenAI Agents with Vertex AI  
  https://www.skills.google/course_templates/1162
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Stanford CS329A  
  https://cs329a.stanford.edu/

#### 4-5 Reliability and safety 🔴
**學習目標**：確保工具調用的安全性，防止誤操作或惡意攻擊。
**適用情境**：金融交易、資料庫寫入等高風險操作。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Gen AI Agents Course  
  https://www.skills.google/course_templates/1267
- AWS – AWS Bedrock Guardrails  
  https://aws.amazon.com/bedrock/
- Academic – Berkeley LLM Agents  
  https://llmagents-learning.org/f24

#### 4-6 Observability and debugging 🔴
**學習目標**：建立監控機制以追蹤 Agent 的行為與工具使用狀況。
**適用情境**：系統維運與錯誤排查。

- DeepLearning.AI – Evaluating and Debugging GenAI  
  https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Google Cloud Skills Boost  
  https://www.cloudskillsboost.google/
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – MIT 6.S191 Deep Learning  
  https://introtodeeplearning.com/

---

### 5. Memory & RAG Systems

#### 5-1 Memory architectures 🟡
**學習目標**：理解短期與長期記憶在 Agent 系統中的設計架構。
**適用情境**：維持對話連貫性與上下文理解。

- DeepLearning.AI – RAG Course  
  https://www.deeplearning.ai/courses/retrieval-augmented-generation-rag/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Build GenAI Agents with Vertex AI  
  https://www.skills.google/course_templates/1162
- AWS – AWS Bedrock Knowledge Bases  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley LLM Agents  
  https://llmagents-learning.org/f24

#### 5-2 Memory representation and storage 🟡
**學習目標**：學習向量資料庫與記憶儲存的技術實作。
**適用情境**：知識庫建置與檢索優化。

- DeepLearning.AI – Building and Evaluating Advanced RAG  
  https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS Bedrock Training  
  https://skillbuilder.aws/generative-ai
- Academic – Stanford CS324  
  https://stanford-cs324.github.io/winter2022/

#### 5-3 Retrieval-Augmented Generation 🟡
**學習目標**：掌握 RAG 技術以增強 Agent 的知識獲取能力。
**適用情境**：企業知識問答、即時資訊查詢。

- DeepLearning.AI – RAG Course  
  https://www.deeplearning.ai/courses/retrieval-augmented-generation-rag/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Build GenAI Agents with Vertex AI  
  https://www.skills.google/course_templates/1162
- AWS – AWS Bedrock Knowledge Bases  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley Agentic AI  
  https://rdi.berkeley.edu/agentic-ai/f25

#### 5-4 State and context management 🔴
**學習目標**：有效管理對話狀態與上下文窗口限制。
**適用情境**：長對話處理與複雜任務狀態追蹤。

- DeepLearning.AI – LangChain: Chat with Your Data  
  https://www.deeplearning.ai/short-courses/langchain-chat-with-your-data/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley LLM Agents MOOC  
  https://llmagents-learning.org/f24

#### 5-5 Reliability and governance 🔴
**學習目標**：確保 RAG 系統的資訊準確性與引用來源管控。
**適用情境**：避免生成錯誤資訊、知識庫版控。

- DeepLearning.AI – Building and Evaluating Advanced RAG  
  https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS Bedrock Guardrails  
  https://aws.amazon.com/bedrock/
- Academic – Stanford Online Agentic AI  
  https://online.stanford.edu/enhancing-your-understanding-agentic-ai-practical-guide

#### 5-6 Privacy and data governance 🔴
**學習目標**：在 RAG 系統中落實資料隱私與存取權限控管。
**適用情境**：處理敏感個資或機密文件。

- DeepLearning.AI – Building and Evaluating Advanced RAG  
  https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS Bedrock Security  
  https://aws.amazon.com/bedrock/
- Academic – MIT Ethics of Technology  
  https://openlearning.mit.edu/news/explore-world-artificial-intelligence-online-courses-mit

---

### 6. Frameworks & Implementation

#### 6-1 Agent framework ecosystem 🟡
**學習目標**：認識主流 Agent 開發框架（LangChain, AutoGen 等）及其生態系。
**適用情境**：技術選型與開發工具評估。

- DeepLearning.AI – AI Agentic Design Patterns with AutoGen  
  https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://developer.nvidia.com/nemo-agent-toolkit
- Google – Build GenAI Agents with Vertex AI  
  https://www.skills.google/course_templates/1162
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley Agentic AI  
  https://rdi.berkeley.edu/agentic-ai/f25

#### 6-2 Core agent components 🟡
**學習目標**：解析框架中的核心元件（Profile, Memory, Planner）實作方式。
**適用情境**：深入客製化開發。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Gen AI Agents Course  
  https://www.skills.google/course_templates/1267
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Stanford CS329A  
  https://cs329a.stanford.edu/

#### 6-3 Build vs framework trade-offs 🔴
**學習目標**：評估自建系統與使用既有框架的優缺點與成本效益。
**適用情境**：專案初期的技術決策。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley LLM Agents  
  https://llmagents-learning.org/f24

#### 6-4 Custom agent loop implementation 🔴
**學習目標**：實作 Agent 的核心控制迴圈（Control Loop）以精確掌控行為。
**適用情境**：需要高度客製化行為邏輯的場景。

- DeepLearning.AI – AI Agents in LangGraph  
  https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Build GenAI Agents with Vertex AI  
  https://www.skills.google/course_templates/1162
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley Advanced LLM Agents  
  https://llmagents-learning.org/sp25

#### 6-5 Engineering best practices 🔴
**學習目標**：掌握 Prompt 版本管理、測試與 CI/CD 等工程化實踐。
**適用情境**：團隊協作開發與系統維護。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – CMU LLM Certificate  
  https://www.cmu.edu/online/gai-llm/curriculum/index.html

#### 6-6 Deployment readiness 🔴
**學習目標**：評估系統部署前的效能、成本與安全準備度。
**適用情境**：產品上線前的最終檢核。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS GenAI Developers Certificate  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Stanford CS329A  
  https://online.stanford.edu/courses/cs329a-self-improving-ai-agents

#### 6-7 Interface and protocol standards 🔴
**學習目標**：了解 Agent 間通訊的協定標準與介面規範。
**適用情境**：跨系統整合與互操作性設計。

- DeepLearning.AI – Building Toward Computer Use  
  https://www.deeplearning.ai/short-courses/building-toward-computer-use-with-anthropic/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://developer.nvidia.com/nemo-agent-toolkit
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley Agentic AI  
  https://rdi.berkeley.edu/agentic-ai/f25

---

### 7. Multi-Agent Systems

#### 7-1 Architectures: hierarchical, collaborative, swarm 🔴
**學習目標**：掌握階層式、協作式與蜂群式等多智慧代理系統架構。
**適用情境**：解決單一 Agent 無法處理的複雜大規模任務。

- DeepLearning.AI – Multi AI Agent Systems with crewAI  
  https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley LLM Agents MOOC  
  https://llmagents-learning.org/f24

#### 7-2 Agent communication protocols 🔴
**學習目標**：設計 Agent 之間的訊息傳遞與溝通機制。
**適用情境**：確保多智慧代理協作的效率與正確性。

- DeepLearning.AI – Design, Develop, Deploy Multi-Agent Systems  
  https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Bedrock Multi-Agent  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Stanford CS329A  
  https://cs329a.stanford.edu/

#### 7-3 Coordination and decision-making 🔴
**學習目標**：實作多智慧代理的協調機制與衝突解決策略。
**適用情境**：資源分配與共同決策。

- DeepLearning.AI – Design, Develop, Deploy Multi-Agent Systems  
  https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.skills.google/course_templates/1267
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley Advanced LLM Agents  
  https://rdi.berkeley.edu/adv-llm-agents/sp25

#### 7-4 Joint planning and execution 🔴
**學習目標**：讓多個 Agent 共同制定計畫並分工執行。
**適用情境**：複雜專案執行與團隊模擬。

- DeepLearning.AI – Practical Multi AI Agents with crewAI  
  https://www.deeplearning.ai/short-courses/practical-multi-ai-agents-and-advanced-use-cases-with-crewai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley LLM Agents  
  https://llmagents-learning.org/f24

#### 7-5 Evaluation and control 🔴
**學習目標**：評估多智慧代理系統的整體效能與可控性。
**適用情境**：系統優化與風險監控。

- DeepLearning.AI – Design, Develop, Deploy Multi-Agent Systems  
  https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – Stanford Online Agentic AI  
  https://online.stanford.edu/enhancing-your-understanding-agentic-ai-practical-guide

#### 7-6 Emergent behaviors and risks 🔴
**學習目標**：研究多智慧代理交互產生的新興行為及其潛在風險。
**適用情境**：高階 AI 安全研究。

- DeepLearning.AI – Design, Develop, Deploy Multi-Agent Systems  
  https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Bedrock Guardrails  
  https://aws.amazon.com/bedrock/
- Academic – Berkeley LLM Agents MOOC  
  https://llmagents-learning.org/f24

#### 7-7 Agent-to-Agent interaction (A2A) 🔴
**學習目標**：設計 Agent 對 Agent 的直接互動介面與協定。
**適用情境**：機器對機器的自動化交易與協商。

- DeepLearning.AI – AI Agentic Design Patterns with AutoGen  
  https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley Agentic AI  
  https://rdi.berkeley.edu/agentic-ai/f25

---

### 8. Evaluation, Safety & Governance

#### 8-1 Agent evaluation methods 🟡
**學習目標**：掌握評估 Agent 能力與安全性的方法論與工具。
**適用情境**：建立 AI 產品驗收標準。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS Bedrock Evaluations  
  https://aws.amazon.com/bedrock/
- Academic – Berkeley LLM Agents  
  https://llmagents-learning.org/f24

#### 8-2 Safety risks and misuse 🟡
**學習目標**：識別 Agent 可能被濫用的風險與安全漏洞。
**適用情境**：紅隊測試（Red Teaming）與安全防護。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Bedrock Guardrails  
  https://aws.amazon.com/bedrock/
- Academic – Stanford Online Agentic AI  
  https://online.stanford.edu/enhancing-your-understanding-agentic-ai-practical-guide

#### 8-3 Human-in-the-loop systems 🟡
**學習目標**：設計「人類介入」機制以確保關鍵決策的安全性。
**適用情境**：高風險領域的輔助決策系統。

- DeepLearning.AI – AI Agents in LangGraph  
  https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – Berkeley LLM Agents MOOC  
  https://llmagents-learning.org/f24

#### 8-4 Governance, accountability, oversight 🔴
**學習目標**：建立 AI 系統的治理架構與問責機制。
**適用情境**：組織內部的 AI 政策制定。

- DeepLearning.AI – Fine-tuning and RL for LLMs  
  https://www.deeplearning.ai/courses/fine-tuning-and-reinforcement-learning-for-llms-intro-to-post-training/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS Bedrock Security  
  https://aws.amazon.com/bedrock/
- Academic – MIT Ethics of Technology  
  https://openlearning.mit.edu/news/explore-world-artificial-intelligence-online-courses-mit

#### 8-5 Ethical, legal, societal implications 🔴
**學習目標**：探討 AI 代理對倫理、法律與社會的影響。
**適用情境**：法規遵循與科技倫理研究。

- DeepLearning.AI – Generative AI for Everyone  
  https://www.deeplearning.ai/courses/generative-ai-for-everyone/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – Harvard CS50 AI  
  https://cs50.harvard.edu/ai/

#### 8-6 Enterprise and public-sector governance 🔴
**學習目標**：針對企業與公部門的特殊需求制定治理規範。
**適用情境**：政府機關與大型企業的 AI 導入策略。

- DeepLearning.AI – Generative AI for Everyone  
  https://www.deeplearning.ai/courses/generative-ai-for-everyone/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS GenAI Developers Certificate  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – CMU LLM Certificate  
  https://www.cmu.edu/online/gai-llm/curriculum/index.html

---

### 9. Production & Capstone

#### 9-1 System architecture and observability 🔴
**學習目標**：設計具備高可觀測性的生產級 Agent 架構。
**適用情境**：大型系統維運與效能優化。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Gen AI Leader Certificate  
  https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley Agentic AI  
  https://rdi.berkeley.edu/agentic-ai/f25

#### 9-2 Scaling and cost optimization 🔴
**學習目標**：優化大規模部署時的運算資源與成本效益。
**適用情境**：商業化產品運營。

- DeepLearning.AI – Efficiently Serving LLMs  
  https://www.deeplearning.ai/short-courses/efficiently-serving-llms/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Generative AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/generative-ai-llm-professional/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS GenAI Developers Certificate  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – CMU LLM Systems  
  https://www.cmu.edu/online/gai-llm/curriculum/index.html

#### 9-3 Representative Agentic AI applications 🟡
**學習目標**：分析與實作具代表性的 Agentic AI 應用案例。
**適用情境**：專題製作與產品原型開發。

- DeepLearning.AI – Practical Multi AI Agents with crewAI  
  https://www.deeplearning.ai/short-courses/practical-multi-ai-agents-and-advanced-use-cases-with-crewai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Building RAG Agents with LLMs  
  https://www.nvidia.com/en-sg/training/instructor-led-workshops/building-rag-agents-with-llms/
- Google – Build GenAI Agents with Vertex AI  
  https://www.skills.google/course_templates/1162
- AWS – AWS Bedrock Agents  
  https://www.coursera.org/professional-certificates/aws-generative-ai-developers
- Academic – Berkeley LLM Agents MOOC  
  https://llmagents-learning.org/f24

#### 9-4 End-to-end system integration 🔴
**學習目標**：整合前端、後端與 AI 模型，完成端到端的系統開發。
**適用情境**：完整產品交付。

- DeepLearning.AI – Design, Develop, Deploy Multi-Agent Systems  
  https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://www.deeplearning.ai/short-courses/nvidia-nat-making-agents-reliable/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Stanford CS329A  
  https://online.stanford.edu/courses/cs329a-self-improving-ai-agents

---

### 10. Advanced Topics

#### 10-1 Coding agents 🔴
**學習目標**：開發能自動撰寫與修正程式碼的 Agent。
**適用情境**：輔助軟體開發與自動化測試。

- DeepLearning.AI – Building Toward Computer Use  
  https://www.deeplearning.ai/short-courses/building-toward-computer-use-with-anthropic/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://developer.nvidia.com/nemo-agent-toolkit
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Berkeley Advanced LLM Agents  
  https://llmagents-learning.org/sp25

#### 10-2 Computer-use agents 🔴
**學習目標**：實作能操控電腦介面（UI）執行任務的 Agent。
**適用情境**：RPA（流程自動化）與桌面工作自動化。

- DeepLearning.AI – Building Toward Computer Use  
  https://www.deeplearning.ai/short-courses/building-toward-computer-use-with-anthropic/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.skills.google/course_templates/1267
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – Berkeley Agentic AI  
  https://rdi.berkeley.edu/agentic-ai/f25

#### 10-3 Emerging protocols and standards 🔴
**學習目標**：追蹤並參與 Agentic AI 領域的新興協定與標準制定。
**適用情境**：前瞻技術研究與標準化工作。

- DeepLearning.AI – Building Toward Computer Use  
  https://www.deeplearning.ai/short-courses/building-toward-computer-use-with-anthropic/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – NeMo Agent Toolkit  
  https://developer.nvidia.com/nemo-agent-toolkit
- Google – Google AI Agents Intensive  
  https://www.kaggle.com/learn-guide/5-day-agents
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Stanford CS329A  
  https://cs329a.stanford.edu/

#### 10-4 World Foundation Models (WFM) 🔴
**學習目標**：了解具備物理世界理解能力的基礎模型。
**適用情境**：機器人控制與實體世界互動模擬。

- DeepLearning.AI – Generative AI with LLMs  
  https://www.deeplearning.ai/courses/generative-ai-with-llms/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – AI Agents  
  https://www.nvidia.com/en-us/ai/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS GenAI Learning  
  https://skillbuilder.aws/generative-ai
- Academic – MIT 6.S191 Deep Learning  
  https://introtodeeplearning.com/

#### 10-5 Long-horizon autonomy 🔴
**學習目標**：研究實現長期自主運作 Agent 的關鍵技術挑戰。
**適用情境**：未來通用人工智慧（AGI）研究方向。

- DeepLearning.AI – Agentic AI  
  https://www.deeplearning.ai/courses/agentic-ai/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Gen AI Agents Course  
  https://www.coursera.org/learn/gen-ai-agents-transform-your-organization
- AWS – AWS Agentic AI Learning  
  https://aws.amazon.com/blogs/apn/introducing-the-agentic-ai-technical-learning-plan-in-aws-skill-builder/
- Academic – Stanford CS329A Self-Improving AI  
  https://cs329a.stanford.edu/

#### 10-6 Emerging research 🔴
**學習目標**：跟進 Agentic AI 領域的最新學術發表與前沿技術。
**適用情境**：學術研究與創新應用開發。

- DeepLearning.AI – Fine-tuning and RL for LLMs  
  https://www.deeplearning.ai/courses/fine-tuning-and-reinforcement-learning-for-llms-intro-to-post-training/
- Microsoft – AI Agents for Beginners  
  https://github.com/microsoft/ai-agents-for-beginners
- Nvidia – Agentic AI LLMs Professional  
  https://www.nvidia.com/en-us/learn/certification/agentic-ai-professional/
- Google – Google Cloud ML Training  
  https://cloud.google.com/learn/training/machinelearning-ai
- AWS – AWS Skill Builder  
  https://skillbuilder.aws/generative-ai
- Academic – Berkeley Advanced LLM Agents  
  https://llmagents-learning.org/sp25