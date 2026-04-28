export const interviewData = [
  // ───────────── HR ROUND ─────────────
  {
    id: 1,
    category: "HR",
    difficulty: "Beginner",
    question: "Tell me about yourself",
    strategy: [
      "Start with present — who you are right now",
      "Briefly mention your educational background",
      "Highlight 1–2 strong and relevant skills",
      "Talk about 1 real project you built",
      "End with your career goal and why this role"
    ],
    structure: {
      intro: "I am a [year] year [branch] student at [college]",
      body: "I have skills in [X, Y] and built a project on [Z]",
      conclusion: "I am looking for opportunities to grow in [field]"
    },
    sampleAnswer:
      "I am a 2nd year Computer Science student at JIIT with a strong interest in backend development. I've worked on a project called PlacementIQ — a full-stack placement prep platform built with React and Node.js where I implemented JWT authentication and MongoDB integration. I enjoy solving real-world problems and am currently sharpening my DSA skills. I'm looking for an internship where I can apply my skills in a practical environment and grow as a software engineer.",
    goodAnswerPoints: [
      "Clear 3-part structure (Present → Past → Future)",
      "Mentions a real, relevant project",
      "Shows direction and ambition",
      "Concise — 2 minutes max"
    ],
    badAnswerPoints: [
      "Reading your resume word for word",
      "Starting with childhood or family details",
      "Being too vague — 'I like computers'",
      "Going beyond 3–4 minutes"
    ],
    followUps: [
      "Can you tell me more about your PlacementIQ project?",
      "What challenges did you face while building it?",
      "Why specifically backend over frontend?"
    ]
  },
  {
    id: 2,
    category: "HR",
    difficulty: "Beginner",
    question: "Why do you want to work here?",
    strategy: [
      "Research the company before the interview",
      "Connect their mission to YOUR interest",
      "Mention a specific product, project, or value you admire",
      "Show that this role aligns with your goals",
      "Never mention salary as a reason"
    ],
    structure: {
      intro: "I've always admired [company] because of [specific reason]",
      body: "Your work on [product/initiative] aligns with my skills in [X]",
      conclusion: "I see this role as the perfect environment to [contribute + grow]"
    },
    sampleAnswer:
      "I've been following your company's work on developer tools for the past year and I genuinely use your product in my own projects. What excites me is your focus on building tools that empower other developers — that perfectly aligns with my passion for backend engineering and building scalable APIs. I see this role as an opportunity to contribute meaningfully while learning from experienced engineers in a product-first company.",
    goodAnswerPoints: [
      "Company-specific — not generic",
      "Connects their mission to your interest",
      "Mentions what you can contribute",
      "Shows you've done your homework"
    ],
    badAnswerPoints: [
      "'Because you're a well-known company'",
      "Mentioning salary or perks",
      "Being generic — could apply to any company",
      "Over-flattering without substance"
    ],
    followUps: [
      "What do you know about our recent products?",
      "How did you hear about this opportunity?",
      "Where else are you interviewing?"
    ]
  },
  {
    id: 3,
    category: "HR",
    difficulty: "Beginner",
    question: "What are your strengths and weaknesses?",
    strategy: [
      "Choose a strength DIRECTLY relevant to the role",
      "Back every strength with a real example",
      "For weakness — pick a REAL one you're actively improving",
      "Show self-awareness and growth mindset",
      "Avoid clichés like 'I'm a perfectionist'"
    ],
    structure: {
      intro: "My biggest strength is [X] which I demonstrated when [example]",
      body: "One area I'm actively improving is [weakness], and here's how...",
      conclusion: "I've made progress by [specific action] and continue to work on it"
    },
    sampleAnswer:
      "My key strength is problem-solving under pressure. During a hackathon, our backend crashed 3 hours before demo — I debugged the database connection issue and got it running in 45 minutes. As for a weakness, I used to struggle with public speaking. I've been actively working on it by presenting my projects in college tech talks, and I've seen a real improvement in my confidence over the last 6 months.",
    goodAnswerPoints: [
      "Specific strength with a real story",
      "Genuine weakness — not a disguised strength",
      "Shows active improvement plan",
      "Honest and self-aware"
    ],
    badAnswerPoints: [
      "'I work too hard' as a weakness",
      "No example for strength",
      "A weakness with no plan to improve",
      "Choosing a critical job-related weakness"
    ],
    followUps: [
      "Tell me about a time your weakness affected your work",
      "How do you handle constructive criticism?",
      "What are you learning right now?"
    ]
  },
  {
    id: 4,
    category: "HR",
    difficulty: "Intermediate",
    question: "Describe a time you faced a conflict in a team",
    strategy: [
      "Use the STAR method: Situation → Task → Action → Result",
      "Pick a real, professional disagreement — not personal drama",
      "Focus on how YOU resolved it, not who was wrong",
      "Show empathy, communication, and maturity",
      "End with a positive outcome and what you learned"
    ],
    structure: {
      intro: "In [project/setting], there was a disagreement about [X]",
      body: "I handled it by [action] — I listened to their perspective and then...",
      conclusion: "The result was [positive outcome] and we built a stronger team process"
    },
    sampleAnswer:
      "During a group project, my teammate and I disagreed about the tech stack — they wanted to use Django while I preferred Node.js since the team had more JS experience. Instead of pushing my view, I organized a 20-minute discussion where we compared both based on project needs and team skill. We agreed on Node.js and documented the reasoning. The project was completed on time and we both learned to decide with data, not preference.",
    goodAnswerPoints: [
      "Uses STAR format clearly",
      "Shows you listened first",
      "Demonstrates data-driven resolution",
      "Ends with a team win"
    ],
    badAnswerPoints: [
      "Blaming the other person",
      "Saying 'I always avoid conflict'",
      "No concrete resolution",
      "Making yourself the sole hero"
    ],
    followUps: [
      "What would you do differently in hindsight?",
      "How do you build trust with teammates?",
      "Have you ever been wrong in a conflict?"
    ]
  },
  {
    id: 5,
    category: "HR",
    difficulty: "Intermediate",
    question: "Where do you see yourself in 5 years?",
    strategy: [
      "Show ambition — but keep it realistic",
      "Align your answer with the company's growth path",
      "Mention skills you want to develop",
      "Talk about the kind of impact you want to create",
      "Don't mention a role at a competitor or 'my own startup' too early"
    ],
    structure: {
      intro: "In 5 years, I see myself growing into a [role] with deep expertise in [domain]",
      body: "I want to work on [type of problems] and develop skills in [X, Y]",
      conclusion: "I believe [company] is the right place to build this trajectory"
    },
    sampleAnswer:
      "In 5 years, I see myself as a proficient backend engineer with deep expertise in distributed systems and cloud infrastructure. I want to go from building features to architecting scalable solutions that serve millions of users. I'd love to grow into a tech lead role where I can also mentor junior engineers. I see this role as the foundation for that journey.",
    goodAnswerPoints: [
      "Shows ambition tied to skill growth",
      "Mentions contribution, not just promotion",
      "Aligns with the company's trajectory",
      "Realistic and grounded"
    ],
    badAnswerPoints: [
      "'I want your job' (too blunt)",
      "No clear vision — 'I don't know'",
      "Mentioning leaving to start your own thing immediately",
      "Purely title-focused without substance"
    ],
    followUps: [
      "What skills are you currently developing?",
      "How do you plan to achieve those goals?",
      "What does success look like for you in this role?"
    ]
  },

  // ───────────── TECHNICAL ROUND ─────────────
  {
    id: 6,
    category: "Technical",
    difficulty: "Beginner",
    question: "What is the difference between HTTP and HTTPS?",
    strategy: [
      "Start with what HTTP is (foundation)",
      "Explain the 'S' — SSL/TLS encryption",
      "Mention the practical difference (data security in transit)",
      "Give a real use-case example",
      "Mention port numbers (80 vs 443)"
    ],
    structure: {
      intro: "HTTP is a protocol for transferring data between client and server",
      body: "HTTPS adds SSL/TLS encryption — data is encrypted before sending",
      conclusion: "HTTPS protects sensitive data like passwords and payments"
    },
    sampleAnswer:
      "HTTP (HyperText Transfer Protocol) is the foundation of web communication — it defines how data is sent between a browser and a server. HTTPS adds a security layer using SSL/TLS encryption, meaning all data in transit is encrypted. Practically, if you log into a site on HTTP, your password travels as plain text and can be intercepted. HTTPS prevents this by encrypting it. HTTP uses port 80, HTTPS uses port 443. Today, all production sites should use HTTPS.",
    goodAnswerPoints: [
      "Explains both clearly",
      "Mentions encryption mechanism (SSL/TLS)",
      "Gives a practical example",
      "Mentions port numbers"
    ],
    badAnswerPoints: [
      "Just saying 'S means secure' without explaining how",
      "No mention of encryption",
      "Confusing HTTP with HTML",
      "Not knowing what port each uses"
    ],
    followUps: [
      "How does SSL/TLS handshake work?",
      "What is a certificate authority?",
      "What is HSTS?"
    ]
  },
  {
    id: 7,
    category: "Technical",
    difficulty: "Intermediate",
    question: "Explain the difference between REST and GraphQL",
    strategy: [
      "Define REST first — resource-based URLs, fixed endpoints",
      "Define GraphQL — single endpoint, client asks for exactly what it needs",
      "Explain the core problem each solves",
      "Give a real over-fetching/under-fetching example",
      "Mention when you'd choose one over the other"
    ],
    structure: {
      intro: "REST uses multiple fixed endpoints; GraphQL uses a single endpoint with a query language",
      body: "REST can cause over-fetching or under-fetching; GraphQL lets the client specify exactly what data it needs",
      conclusion: "REST is simpler for simple APIs; GraphQL shines for complex, interconnected data"
    },
    sampleAnswer:
      "REST APIs are structured around resources — you have fixed endpoints like /users, /posts, /comments. The server decides what data is returned. This can lead to over-fetching (getting unused fields) or under-fetching (needing multiple requests). GraphQL uses a single /graphql endpoint. The client writes a query specifying exactly what fields it needs. For example, in a social app, one GraphQL query can fetch a user, their posts, and comment counts in one request. REST is great for simple CRUD APIs; GraphQL is better for complex, interconnected data with many client types (web, mobile).",
    goodAnswerPoints: [
      "Explains both clearly",
      "Demonstrates over/under-fetching problem",
      "Gives a practical example",
      "Knows when to use each"
    ],
    badAnswerPoints: [
      "Saying GraphQL is always better",
      "Confusing GraphQL with a database query language",
      "Not knowing what over-fetching means",
      "No mention of trade-offs"
    ],
    followUps: [
      "What are the downsides of GraphQL?",
      "How does caching differ in REST vs GraphQL?",
      "Have you used either in a project?"
    ]
  },
  {
    id: 8,
    category: "Technical",
    difficulty: "Intermediate",
    question: "What is JWT and how does it work?",
    strategy: [
      "Explain what JWT stands for and its purpose",
      "Break down the 3 parts: Header, Payload, Signature",
      "Explain the flow: server signs, client stores, client sends back",
      "Explain verification — server checks signature",
      "Mention statelessness as the core advantage"
    ],
    structure: {
      intro: "JWT is a compact, self-contained token for securely transmitting information between parties",
      body: "It has 3 base64 encoded parts: Header (algorithm), Payload (claims/data), Signature (verification)",
      conclusion: "The server signs the token; on each request, the signature is verified — no session storage needed"
    },
    sampleAnswer:
      "JWT stands for JSON Web Token. It's used for stateless authentication. When a user logs in, the server creates a JWT with 3 parts: the Header (encoding algorithm like HS256), the Payload (user data like id and email), and the Signature (Header + Payload signed with a secret key). The token is sent to the client and stored in localStorage. On subsequent requests, the client sends it in the Authorization header. The server verifies the signature — if valid, it trusts the payload without checking a database. This makes it stateless and scalable.",
    goodAnswerPoints: [
      "Explains all 3 parts",
      "Describes full auth flow",
      "Explains why it's stateless",
      "Mentions where it's stored client-side"
    ],
    badAnswerPoints: [
      "Saying JWT is encrypted (it's encoded, not encrypted by default)",
      "Not knowing what the signature does",
      "Confusing it with sessions",
      "No mention of the verification step"
    ],
    followUps: [
      "What's the difference between JWT and sessions?",
      "How do you handle token expiration?",
      "Is the payload in JWT secure?"
    ]
  },
  {
    id: 9,
    category: "Technical",
    difficulty: "Advanced",
    question: "Describe a complex project you worked on — architecture and technical decisions",
    strategy: [
      "Use STAR: Situation → Task → Action → Result",
      "Describe the architecture at a high level first",
      "Highlight a specific technical challenge you solved",
      "Talk about your specific role and decisions",
      "Quantify the result if possible"
    ],
    structure: {
      intro: "I built [project] — a [description] using [tech stack]",
      body: "The biggest challenge was [problem]. I solved it by [technical decision]",
      conclusion: "The result: [measurable outcome]. Key learning: [insight]"
    },
    sampleAnswer:
      "I built PlacementIQ — a full-stack placement preparation platform using React, Node.js, Express, and MongoDB Atlas. The architecture follows a REST API pattern with JWT-based authentication. The biggest challenge was implementing optional 2FA using email OTP — I had to design a state machine in the login flow: check credentials → if 2FA enabled, generate OTP, save with expiry, return requiresOTP flag → separate verify-OTP endpoint issues final JWT. I also migrated all data from flat JSON files to MongoDB using a custom seed script. The result is a working multi-user auth system with protected routes and persistent data storage.",
    goodAnswerPoints: [
      "Clear architecture overview",
      "Specific technical challenge highlighted",
      "Explains reasoning behind decisions",
      "Quantifiable or concrete result"
    ],
    badAnswerPoints: [
      "Vague — 'I built a website'",
      "No mention of the stack",
      "No technical depth",
      "Taking credit for team work without clarifying role"
    ],
    followUps: [
      "How would you scale this to 100k users?",
      "What would you redesign if you started over?",
      "How did you handle database schema changes?"
    ]
  },

  // ───────────── CODING PREP ─────────────
  {
    id: 10,
    category: "Coding",
    difficulty: "Beginner",
    question: "How do you approach a coding problem you've never seen before?",
    strategy: [
      "Step 1: Clarify — ask about input, output, constraints, edge cases",
      "Step 2: Examples — walk through 2-3 examples manually",
      "Step 3: Brute force — get ANY solution working first",
      "Step 4: Optimize — identify bottlenecks and improve",
      "Step 5: Code + test — write clean code and verify"
    ],
    structure: {
      intro: "I follow a structured 5-step approach to ensure I don't miss anything",
      body: "Clarify → Examples → Brute Force → Optimize → Code & Test",
      conclusion: "Communicating every step is as important as the solution itself"
    },
    sampleAnswer:
      "First, I clarify the problem — I ask about input size, constraints, and edge cases like empty arrays or negative numbers. Then I manually trace through 2–3 examples to build intuition. I always start with a brute force solution even if it's O(n²) — it shows the interviewer my logic. Then I identify the bottleneck: is it repeated work? Sorting? Nested loops? I optimize from there. I explain my thought process at every step because interviewers are evaluating your thinking, not just your answer.",
    goodAnswerPoints: [
      "Structured step-by-step approach",
      "Mentions clarification first",
      "Acknowledges brute force as valid first step",
      "Talks about communication"
    ],
    badAnswerPoints: [
      "Jumping to code immediately",
      "Staying silent while thinking",
      "Never asking for clarification",
      "Giving up if the optimal solution isn't obvious"
    ],
    followUps: [
      "What if you're stuck and have no idea?",
      "How do you handle time pressure in coding rounds?",
      "What's your process for finding edge cases?"
    ]
  },
  {
    id: 11,
    category: "Coding",
    difficulty: "Intermediate",
    question: "Explain Big O Notation with examples",
    strategy: [
      "Define it clearly — worst-case time/space growth as input grows",
      "Walk through common complexities with simple examples",
      "Show how to analyze a code snippet",
      "Explain the difference between time and space complexity",
      "Mention that constants and lower-order terms are dropped"
    ],
    structure: {
      intro: "Big O describes how runtime or space scales with input size n",
      body: "O(1) = constant, O(log n) = binary search, O(n) = linear scan, O(n²) = nested loops",
      conclusion: "We analyze worst case and drop constants — O(2n) becomes O(n)"
    },
    sampleAnswer:
      "Big O Notation describes how an algorithm's runtime or space grows as the input size n increases. O(1) is constant time — like accessing an array by index. O(log n) is logarithmic — binary search halves the search space each step. O(n) is linear — a single loop through n elements. O(n²) is quadratic — a nested loop. O(n log n) is typical for sorting algorithms like merge sort. We always drop constants: O(2n) is just O(n), because Big O focuses on the growth pattern, not exact operations.",
    goodAnswerPoints: [
      "Clear definition",
      "Examples for each common complexity",
      "Explains dropping constants",
      "Can analyze a code snippet"
    ],
    badAnswerPoints: [
      "Confusing time and space complexity",
      "Not knowing what O(log n) means",
      "Saying O(2n) is better than O(n)",
      "Unable to analyze a simple loop"
    ],
    followUps: [
      "What's the complexity of QuickSort?",
      "How do you calculate space complexity?",
      "What's the difference between best, average, and worst case?"
    ]
  }
];
