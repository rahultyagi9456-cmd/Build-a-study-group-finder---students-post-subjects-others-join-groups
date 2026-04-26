const heroTilt = document.querySelector("#hero-tilt");
const sections = document.querySelectorAll(".reveal.section");
const tabs = document.querySelectorAll(".feature-tab");
const featureTitle = document.querySelector("#feature-title");
const featureBody = document.querySelector("#feature-body");
const featurePoints = document.querySelector("#feature-points");
const featurePreview = document.querySelector("#feature-preview");
const cursorDot = document.querySelector(".cursor-dot");
const cursorFollower = document.querySelector(".cursor-follower");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(pointer: fine)");
const loader = document.querySelector("#sv-loader");
const loaderSkipButton = document.querySelector("#sv-loader-skip");
const pageShell = document.querySelector("#page-shell");

const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const counters = document.querySelectorAll(".counter");
const countdownTimer = document.querySelector("#countdown-timer");

const searchForm = document.querySelector("#search-form");
const subjectFilter = document.querySelector("#subject-filter");
const examFilter = document.querySelector("#exam-filter");
const cityFilter = document.querySelector("#city-filter");
const modeFilter = document.querySelector("#mode-filter");
const resultsSummary = document.querySelector("#results-summary");
const resultChips = document.querySelector("#result-chips");
const groupCards = document.querySelectorAll(".group-card");

const matchForm = document.querySelector("#match-form");
const quizResult = document.querySelector("#quiz-result");
const faqItems = document.querySelectorAll(".faq-item");

const modalBackdrop = document.querySelector("#modal-backdrop");
const modalClose = document.querySelector("#modal-close");
const modalTabs = document.querySelectorAll(".modal-tab");
const modalViews = document.querySelectorAll(".modal-view");
const modalForms = document.querySelectorAll(".modal-form");

const roomList = document.querySelector("#room-list");
const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatUsername = document.querySelector("#chat-username");
const newRoomName = document.querySelector("#new-room-name");
const roomCreateForm = document.querySelector("#room-create-form");
const chatRoomTitle = document.querySelector("#chat-room-title");
const chatRoomMeta = document.querySelector("#chat-room-meta");
const createRoomButton = document.querySelector("#create-room-button");

const openAiModelInput = document.querySelector("#openai-model");
const checkServerStatusButton = document.querySelector("#check-server-status");
const aiKeyStatus = document.querySelector("#ai-key-status");
const aiQuestionForm = document.querySelector("#ai-question-form");
const aiExam = document.querySelector("#ai-exam");
const aiSubject = document.querySelector("#ai-subject");
const aiDifficulty = document.querySelector("#ai-difficulty");
const aiCount = document.querySelector("#ai-count");
const aiPrompt = document.querySelector("#ai-prompt");
const aiOutput = document.querySelector("#ai-output");
const askAiDoubtButton = document.querySelector("#ask-ai-doubt");
const loadSuggestedPromptButton = document.querySelector("#load-suggested-prompt");

const problemList = document.querySelector("#problem-list");
const problemTitle = document.querySelector("#problem-title");
const problemDescription = document.querySelector("#problem-description");
const problemTopicChip = document.querySelector("#problem-topic-chip");
const problemLevelChip = document.querySelector("#problem-level-chip");
const practiceProblemDifficulty = document.querySelector("#practice-problem-difficulty");
const codeEditor = document.querySelector("#code-editor");
const runCodeButton = document.querySelector("#run-code");
const resetCodeButton = document.querySelector("#reset-code");
const explainProblemButton = document.querySelector("#explain-problem");
const testOutput = document.querySelector("#test-output");
const chipTopLeft = document.querySelector(".chip-top-left");
const chipTopRight = document.querySelector(".chip-top-right");
const chipBottomRight = document.querySelector(".chip-bottom-right");

const STORAGE_KEYS = {
  username: "studyverse.username",
  activeRoom: "studyverse.activeRoom",
  chatState: "studyverse.chatState",
  model: "studyverse.claudeModel",
};

const DEFAULT_CHAT_STATE = {
  rooms: [
    {
      id: "common-lobby",
      name: "common-lobby",
      membersOnline: 12,
      messages: [
        {
          user: "Riya",
          text: "8 PM se derivation sprint start ho raha hai. Join if you're revising electrostatics.",
          time: "08:04 PM",
        },
        {
          user: "Aarav",
          text: "Kisi ke paas NLM ke tricky rotation questions hain kya?",
          time: "08:07 PM",
        },
      ],
    },
    {
      id: "placements-hub",
      name: "placements-hub",
      membersOnline: 9,
      messages: [
        {
          user: "Sana",
          text: "Aaj stack + monotonic queue revision karte hain. 25 mins me room live.",
          time: "07:42 PM",
        },
      ],
    },
    {
      id: "neet-revision",
      name: "neet-revision",
      membersOnline: 7,
      messages: [
        {
          user: "Krisha",
          text: "Biomolecules ke NCERT line-based questions add kar diye. Check pinned notes.",
          time: "06:58 PM",
        },
      ],
    },
  ],
};

const featureContent = {
  find: {
    title: "Join rooms that already match your momentum.",
    body: "Filter by subject, exam date, vibe, and pace. Instantly discover groups that feel aligned before you even say hello.",
    points: [
      "Topic-first discovery",
      "Exam countdown filters",
      "Deep focus cohorts",
    ],
    preview: `
      <div class="preview-stat">
        <p>Top Match</p>
        <strong>Data Structures • 96%</strong>
      </div>
      <div class="preview-card">
        <div>
          <p class="preview-label">Live Cohort</p>
          <h3>Night Owl Revision Grid</h3>
        </div>
        <span>24 / 30 seats</span>
      </div>
      <div class="preview-list">
        <div>
          <span>Vibe</span>
          <strong>Quiet Focus</strong>
        </div>
        <div>
          <span>Mode</span>
          <strong>Pomodoro 50/10</strong>
        </div>
        <div>
          <span>Best For</span>
          <strong>Exam Week</strong>
        </div>
      </div>
      <div class="panel-glow"></div>
    `,
  },
  live: {
    title: "Step into live sessions that feel cinematic and alive.",
    body: "See what is active right now, who is speaking, and when the next sprint starts. Drop in with one tap and stay synced.",
    points: [
      "Real-time session status",
      "Voice room pulse indicators",
      "Countdown-based room entry",
    ],
    preview: `
      <div class="preview-stat">
        <p>Streaming Now</p>
        <strong>Organic Chemistry • 412 listeners</strong>
      </div>
      <div class="preview-card">
        <div>
          <p class="preview-label">Focus Sprint</p>
          <h3>Finals Live Room</h3>
        </div>
        <span>Started 09:14 PM</span>
      </div>
      <div class="preview-list">
        <div>
          <span>Host</span>
          <strong>Riya Sharma</strong>
        </div>
        <div>
          <span>Cycle</span>
          <strong>45 min deep work</strong>
        </div>
        <div>
          <span>Energy</span>
          <strong>High accountability</strong>
        </div>
      </div>
      <div class="panel-glow"></div>
    `,
  },
  match: {
    title: "Let smart matching assemble your ideal study crew.",
    body: "We compare study habits, target scores, subjects, and availability to surface groups that raise your odds of consistency.",
    points: [
      "Score goal clustering",
      "Schedule overlap matching",
      "Compatibility-based recommendations",
    ],
    preview: `
      <div class="preview-stat">
        <p>Compatibility Engine</p>
        <strong>Matched with 7 high-intent peers</strong>
      </div>
      <div class="preview-card">
        <div>
          <p class="preview-label">Suggested Circle</p>
          <h3>Rank Booster Squad</h3>
        </div>
        <span>98% fit</span>
      </div>
      <div class="preview-list">
        <div>
          <span>Shared Goal</span>
          <strong>Top 1% percentile</strong>
        </div>
        <div>
          <span>Peak Time</span>
          <strong>6 PM - 10 PM</strong>
        </div>
        <div>
          <span>Strength</span>
          <strong>Daily consistency streaks</strong>
        </div>
      </div>
      <div class="panel-glow"></div>
    `,
  },
};

const quizMatches = {
  rank_competitive_night: {
    title: "DSA Interview Sprint",
    body: "Fast-paced mock rounds, leaderboard pressure, and nightly sessions for students chasing sharp performance gains.",
    pills: ["97% compatibility", "Competitive sprint", "Night sessions"],
  },
  consistency_quiet_morning: {
    title: "Morning Momentum Circle",
    body: "A calm, repeatable morning room designed for daily streaks, deep focus, and low-distraction accountability.",
    pills: ["94% compatibility", "Morning routine", "Quiet focus"],
  },
  revision_collab_evening: {
    title: "Neuro Revision Circle",
    body: "Best for discussion-led revision, concept recall, and quick memory reinforcement with a collaborative vibe.",
    pills: ["95% compatibility", "Evening recall", "Collaborative vibe"],
  },
  default: {
    title: "Night Owl Revision Grid",
    body: "Best for focused students who want a calm room, structured sessions, and a reliable nightly streak.",
    pills: ["96% compatibility", "Night routine", "Quiet focus"],
  },
};

const fallbackQuestionBank = {
  "JEE Main|Physics": [
    "Derive the expression for drift velocity and explain how it affects current density.",
    "A block on an inclined plane is attached to a spring. Find the equilibrium extension and oscillation frequency.",
    "Compare electric field and potential inside and outside a uniformly charged sphere.",
    "A ray passes through a convex lens and a glass slab. Track the final image shift step by step.",
    "State the assumptions of Bohr's model and calculate the radius of the third orbit of hydrogen.",
  ],
  "NEET|Biology": [
    "Differentiate between xylem and phloem with one transport example for each.",
    "Explain the stages of mitosis and identify the stage where spindle fibers attach.",
    "Write five NCERT-based questions on respiration in plants with short answers.",
    "List the functions of the hypothalamus and one hormone pathway it influences.",
    "Explain double fertilization and why it is unique to angiosperms.",
  ],
  "Placements|Data Structures": [
    "Write the time complexity of insertion, deletion, and search in a binary heap.",
    "Explain why two pointers work for sorted two-sum and when the method fails.",
    "Give one coding question each for stack, queue, sliding window, and DFS.",
    "When should you prefer a hash map over a balanced BST in interviews?",
    "Solve a sample 'longest substring without repeating characters' dry run.",
  ],
  "Semester Exams|Mathematics": [
    "Find the eigenvalues of a 3x3 matrix and explain each elimination step.",
    "State Rolle's theorem and verify whether it applies to a cubic polynomial on a closed interval.",
    "Give three integration questions based on partial fractions with final answers.",
    "Differentiate between convergence in sequence and convergence in series with examples.",
    "Find the Fourier series coefficients for a simple periodic function.",
  ],
};

const codingProblems = [
  {
    id: "two-sum",
    title: "Two Sum Indices",
    topic: "Arrays",
    level: "Easy",
    functionName: "twoSum",
    description:
      "Return the indices of two numbers in an array that add up to the target. You may assume exactly one valid answer exists.",
    starterCode: `function twoSum(nums, target) {
  // Return an array like [index1, index2]
  return [];
}`,
    tests: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { args: [[3, 2, 4], 6], expected: [1, 2] },
      { args: [[3, 3], 6], expected: [0, 1] },
    ],
  },
  {
    id: "palindrome",
    title: "Valid Palindrome",
    topic: "Strings",
    level: "Easy",
    functionName: "isPalindrome",
    description:
      "Return true if the input string is a palindrome after lowercasing and removing non-alphanumeric characters.",
    starterCode: `function isPalindrome(text) {
  // Return true or false
  return false;
}`,
    tests: [
      { args: ["A man, a plan, a canal: Panama"], expected: true },
      { args: ["race a car"], expected: false },
      { args: ["No lemon, no melon"], expected: true },
    ],
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray Sum",
    topic: "Dynamic Programming",
    level: "Medium",
    functionName: "maxSubArray",
    description:
      "Return the largest possible sum of a contiguous subarray from the given integer array.",
    starterCode: `function maxSubArray(nums) {
  // Return the maximum contiguous sum
  return 0;
}`,
    tests: [
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { args: [[1]], expected: 1 },
      { args: [[5, 4, -1, 7, 8]], expected: 23 },
    ],
  },
];

const appState = {
  countdownTarget: Date.now() + (14 * 60 + 32) * 1000,
  rooms: [],
  activeRoomId: null,
  selectedProblemId: codingProblems[0].id,
  aiEnabled: false,
  chatMode: "local",
};

const api = async (path, options = {}) => {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
};

const formatTime = (date = new Date()) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const normalizeRoomId = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const nl2br = (value) => escapeHtml(value).replaceAll("\n", "<br />");
const getModel = () =>
  localStorage.getItem(STORAGE_KEYS.model) || "claude-sonnet-4-20250514";

const cloneDefaultChatState = () => JSON.parse(JSON.stringify(DEFAULT_CHAT_STATE));

const loadLocalChatState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.chatState);
    if (!saved) {
      const initialState = cloneDefaultChatState();
      localStorage.setItem(STORAGE_KEYS.chatState, JSON.stringify(initialState));
      return initialState;
    }

    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.rooms)) {
      throw new Error("Invalid chat store");
    }
    return parsed;
  } catch {
    const fallbackState = cloneDefaultChatState();
    localStorage.setItem(STORAGE_KEYS.chatState, JSON.stringify(fallbackState));
    return fallbackState;
  }
};

const saveLocalChatState = (store) => {
  localStorage.setItem(STORAGE_KEYS.chatState, JSON.stringify(store));
};

const setResponsiveNavState = () => {
  if (window.innerWidth <= 820) {
    document.body.classList.add("menu-collapsed");
    document.body.classList.remove("menu-open");
    mobileNavToggle?.setAttribute("aria-expanded", "false");
  } else {
    document.body.classList.remove("menu-collapsed", "menu-open");
    mobileNavToggle?.setAttribute("aria-expanded", "false");
  }
};

const revealSections = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  sections.forEach((section) => observer.observe(section));
};

const setupHeroTilt = () => {
  if (!heroTilt || motionQuery.matches) {
    return;
  }

  const chipConfigs = [
    { element: chipTopLeft, factor: 0.02 },
    { element: chipTopRight, factor: 0.015 },
    { element: chipBottomRight, factor: 0.025 },
  ];

  document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;
    heroTilt.style.transform =
      `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    chipConfigs.forEach(({ element, factor }) => {
      if (!element) {
        return;
      }

      const rotX = (centerY - mouseY) * factor;
      const rotY = (mouseX - centerX) * factor;
      element.style.transform =
        `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(20px)`;
    });
  });

  document.addEventListener("mouseleave", () => {
    heroTilt.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    chipConfigs.forEach(({ element }) => {
      if (!element) {
        return;
      }

      element.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    });
  });
};

const setupLoader = () => {
  if (!loader || !pageShell) {
    document.body.classList.add("loader-complete");
    return;
  }

  let dismissed = false;

  const dismissLoader = () => {
    if (dismissed) {
      return;
    }

    dismissed = true;
    loader.classList.add("is-hidden");
    document.body.classList.add("loader-complete");
  };

  window.setTimeout(dismissLoader, 2600);
  loaderSkipButton?.addEventListener("click", dismissLoader);
};

const setupTabs = () => {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const content = featureContent[tab.dataset.feature];
      tabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      featureTitle.textContent = content.title;
      featureBody.textContent = content.body;
      featurePoints.innerHTML = content.points
        .map((point) => `<div class="feature-point glass-chip">${point}</div>`)
        .join("");
      featurePreview.innerHTML = content.preview;
    });
  });
};

const setupCursor = () => {
  if (!finePointerQuery.matches || !cursorDot || !cursorFollower) {
    return;
  }

  const state = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    followerX: window.innerWidth / 2,
    followerY: window.innerHeight / 2,
  };

  const render = () => {
    state.followerX += (state.x - state.followerX) * 0.16;
    state.followerY += (state.y - state.followerY) * 0.16;
    cursorDot.style.left = `${state.x}px`;
    cursorDot.style.top = `${state.y}px`;
    cursorFollower.style.left = `${state.followerX}px`;
    cursorFollower.style.top = `${state.followerY}px`;
    window.requestAnimationFrame(render);
  };

  window.addEventListener("mousemove", (event) => {
    state.x = event.clientX;
    state.y = event.clientY;
  });

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest(".interactive")) {
      cursorFollower.classList.add("active");
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.closest(".interactive")) {
      cursorFollower.classList.remove("active");
    }
  });

  window.requestAnimationFrame(render);
};

const setupScrollButtons = () => {
  document.querySelectorAll("[data-scroll]").forEach((element) => {
    element.addEventListener("click", () => {
      const target = document.querySelector(element.dataset.scroll);
      target?.scrollIntoView({ behavior: motionQuery.matches ? "auto" : "smooth" });
    });
  });
};

const setupCounters = () => {
  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);
    const start = performance.now();
    const duration = 1500;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

const setupCountdown = () => {
  if (!countdownTimer) {
    return;
  }

  const tick = () => {
    const diff = Math.max(0, appState.countdownTarget - Date.now());
    const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    countdownTimer.textContent = `${hours}:${minutes}:${seconds}`;
  };

  tick();
  window.setInterval(tick, 1000);
};

const updateResults = (visibleCards) => {
  const count = visibleCards.length;
  resultsSummary.textContent =
    count > 0
      ? `Showing ${count} matching study group${count > 1 ? "s" : ""}`
      : "No exact matches. Try broader filters.";

  resultChips.innerHTML = visibleCards.length
    ? visibleCards
        .map((card) => {
          const title = card.querySelector("h3")?.textContent?.trim() || "Study group";
          return `<button class="result-chip interactive" type="button" data-open-modal="join">${title}</button>`;
        })
        .join("")
    : `<button class="result-chip interactive" type="button" data-open-modal="create">Create a new matching group</button>`;
};

const filterGroups = () => {
  const filters = {
    subject: subjectFilter?.value || "all",
    exam: examFilter?.value || "all",
    city: cityFilter?.value || "all",
    mode: modeFilter?.value || "all",
  };

  const visibleCards = [];
  groupCards.forEach((card) => {
    const dataNode = card.querySelector(".group-card-filter-data");
    const matches = Object.entries(filters).every(([key, value]) => {
      if (value === "all") {
        return true;
      }
      return dataNode?.dataset[key] === value;
    });

    card.classList.toggle("hidden", !matches);
    if (matches) {
      visibleCards.push(card);
    }
  });

  updateResults(visibleCards);
};

const setupSearch = () => {
  if (!searchForm) {
    return;
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterGroups();
    document.querySelector("#groups")?.scrollIntoView({
      behavior: motionQuery.matches ? "auto" : "smooth",
    });
  });
};

const setupQuiz = () => {
  if (!matchForm || !quizResult) {
    return;
  }

  matchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const goal = document.querySelector("#goal-input")?.value;
    const style = document.querySelector("#style-input")?.value;
    const time = document.querySelector("#time-input")?.value;
    const match = quizMatches[`${goal}_${style}_${time}`] || quizMatches.default;

    quizResult.innerHTML = `
      <p class="quiz-result-label">Recommended Match</p>
      <h3>${escapeHtml(match.title)}</h3>
      <p>${escapeHtml(match.body)}</p>
      <div class="feature-points">
        ${match.pills
          .map((pill) => `<div class="feature-point glass-chip">${escapeHtml(pill)}</div>`)
          .join("")}
      </div>
      <button class="secondary-cta interactive" type="button" data-open-modal="join">
        Join This Group
      </button>
    `;
  });
};

const setupFaq = () => {
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    question?.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      question.setAttribute("aria-expanded", String(open));
      answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0px";
    });
  });
};

const setupMobileNav = () => {
  setResponsiveNavState();

  mobileNavToggle?.addEventListener("click", () => {
    if (window.innerWidth > 820) {
      return;
    }
    const open = document.body.classList.toggle("menu-open");
    mobileNavToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 820) {
        document.body.classList.remove("menu-open");
        mobileNavToggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  window.addEventListener("resize", setResponsiveNavState);
};

const setModalView = (view) => {
  modalTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.modalView === view);
  });
  modalViews.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.view === view);
  });
};

const openModal = (view = "join") => {
  if (!modalBackdrop) {
    return;
  }
  setModalView(view);
  modalBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  if (!modalBackdrop) {
    return;
  }
  modalBackdrop.hidden = true;
  document.body.style.overflow = "";
};

const setupModal = () => {
  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-modal]");
    if (openButton) {
      openModal(openButton.dataset.openModal);
      return;
    }

    if (event.target === modalBackdrop) {
      closeModal();
    }
  });

  modalTabs.forEach((tab) => {
    tab.addEventListener("click", () => setModalView(tab.dataset.modalView));
  });

  modalClose?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalBackdrop && !modalBackdrop.hidden) {
      closeModal();
    }
  });

  modalForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const original = button?.textContent || "Submitted";
      if (button) {
        button.textContent = "Submitted";
        button.disabled = true;
      }
      window.setTimeout(() => {
        if (button) {
          button.textContent = original;
          button.disabled = false;
        }
        form.reset();
        closeModal();
      }, 700);
    });
  });
};

const getActiveRoom = () =>
  appState.rooms.find((room) => room.id === appState.activeRoomId) || appState.rooms[0];

const renderRooms = () => {
  if (!roomList) {
    return;
  }

  roomList.innerHTML = appState.rooms
    .map(
      (room) => `
        <button
          class="room-chip interactive ${room.id === appState.activeRoomId ? "active" : ""}"
          type="button"
          data-room-id="${escapeHtml(room.id)}"
        >
          <div>
            <strong># ${escapeHtml(room.name)}</strong>
            <span>${room.membersOnline} members online</span>
          </div>
        </button>
      `
    )
    .join("");
};

const renderMessages = () => {
  const room = getActiveRoom();
  if (!room || !chatMessages) {
    return;
  }

  chatRoomTitle.textContent = `# ${room.name}`;
  chatRoomMeta.textContent = `${room.membersOnline} members online`;
  chatMessages.innerHTML = room.messages
    .map((message) => {
      const isSelf = message.user === (chatUsername.value.trim() || "You");
      return `
        <article class="chat-message ${isSelf ? "is-self" : ""}">
          <div class="chat-message-meta">
            <strong>${escapeHtml(message.user)}</strong>
            <span>${escapeHtml(message.time)}</span>
          </div>
          <p>${escapeHtml(message.text)}</p>
        </article>
      `;
    })
    .join("");
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const syncRooms = (roomsPayload) => {
  appState.rooms = roomsPayload.rooms || [];
  if (!appState.activeRoomId || !appState.rooms.some((room) => room.id === appState.activeRoomId)) {
    appState.activeRoomId =
      localStorage.getItem(STORAGE_KEYS.activeRoom) || appState.rooms[0]?.id || null;
  }
  renderRooms();
  renderMessages();
};

const setupChat = async () => {
  if (!roomList || !chatForm) {
    return;
  }

  chatUsername.value = localStorage.getItem(STORAGE_KEYS.username) || "You";

  try {
    const state = await api("/api/chat/state");
    appState.chatMode = "server";
    syncRooms(state);
  } catch (error) {
    appState.chatMode = "local";
    syncRooms(loadLocalChatState());
    chatRoomMeta.textContent = "Local demo chat active on this deployment";
  }

  roomList.addEventListener("click", (event) => {
    const roomButton = event.target.closest("[data-room-id]");
    if (!roomButton) {
      return;
    }
    appState.activeRoomId = roomButton.dataset.roomId;
    localStorage.setItem(STORAGE_KEYS.activeRoom, appState.activeRoomId);
    renderRooms();
    renderMessages();
  });

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = chatInput.value.trim();
    const room = getActiveRoom();
    if (!text || !room) {
      return;
    }

    try {
      if (appState.chatMode === "server") {
        await api("/api/chat/messages", {
          method: "POST",
          body: JSON.stringify({
            roomId: room.id,
            user: chatUsername.value.trim() || "You",
            text,
          }),
        });
      } else {
        const store = loadLocalChatState();
        const activeRoom = store.rooms.find((item) => item.id === room.id);
        if (!activeRoom) {
          throw new Error("Room not found.");
        }
        activeRoom.messages.push({
          user: chatUsername.value.trim() || "You",
          text,
          time: formatTime(),
        });
        activeRoom.messages = activeRoom.messages.slice(-50);
        saveLocalChatState(store);
        syncRooms(store);
      }
      chatInput.value = "";
    } catch (error) {
      chatRoomMeta.textContent = error.message;
    }
  });

  chatUsername.addEventListener("change", () => {
    localStorage.setItem(STORAGE_KEYS.username, chatUsername.value.trim() || "You");
  });

  roomCreateForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = newRoomName.value.trim();
    if (!name || !normalizeRoomId(name)) {
      return;
    }
    try {
      let room;
      if (appState.chatMode === "server") {
        room = await api("/api/chat/rooms", {
          method: "POST",
          body: JSON.stringify({ name }),
        });
      } else {
        const store = loadLocalChatState();
        const roomId = normalizeRoomId(name);
        if (store.rooms.some((item) => item.id === roomId)) {
          throw new Error("Room already exists.");
        }
        room = {
          id: roomId,
          name,
          membersOnline: 1,
          messages: [
            {
              user: "StudyVerse",
              text: `Room "${name}" created. Start the conversation and set the tone.`,
              time: formatTime(),
            },
          ],
        };
        store.rooms.unshift(room);
        saveLocalChatState(store);
        syncRooms(store);
      }
      appState.activeRoomId = room.id;
      localStorage.setItem(STORAGE_KEYS.activeRoom, room.id);
      newRoomName.value = "";
    } catch (error) {
      chatRoomMeta.textContent = error.message;
    }
  });

  createRoomButton?.addEventListener("click", () => newRoomName.focus());

  if (appState.chatMode === "server") {
    const stream = new EventSource("/api/chat/stream");
    stream.addEventListener("rooms", (event) => {
      syncRooms(JSON.parse(event.data));
    });
    stream.onerror = () => {
      chatRoomMeta.textContent = "Realtime sync disconnected";
    };
  } else {
    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEYS.chatState) {
        syncRooms(loadLocalChatState());
      }
    });
  }
};

const renderAiOutput = (html) => {
  aiOutput.innerHTML = html;
  aiOutput.scrollTop = 0;
};

const updateAiStatus = (message, isError = false) => {
  aiKeyStatus.textContent = message;
  aiKeyStatus.style.color = isError
    ? "rgba(255, 170, 170, 0.88)"
    : "rgba(255, 255, 255, 0.7)";
};

const checkServerHealth = async () => {
  try {
    const health = await api("/api/health");
    appState.aiEnabled = Boolean(health.aiEnabled);
    updateAiStatus(
      health.aiEnabled
        ? "Server is running and AI is enabled via ANTHROPIC_API_KEY (Claude)."
        : "Server is running, but ANTHROPIC_API_KEY is not set yet."
    );
  } catch (error) {
    updateAiStatus(`Server check failed: ${error.message}`, true);
  }
};

const callClaude = async (prompt) => {
  const data = await api("/api/ai", {
    method: "POST",
    body: JSON.stringify({
      model: getModel(),
      prompt,
    }),
  });
  return data.text || "";
};

const buildQuestionPrompt = () => {
  const customInstruction = aiPrompt.value.trim() || "Focus on high-yield revision topics.";
  return `You are an expert study coach. Generate ${aiCount.value} ${aiDifficulty.value} practice questions for ${aiExam.value} in ${aiSubject.value}. For each question, include:
1. The question
2. A short hint
3. The final answer or expected output

Keep the output concise and cleanly formatted in markdown.

Additional user instruction: ${customInstruction}`;
};

const buildDoubtPrompt = () => `You are helping a student prepare for ${aiExam.value} in ${aiSubject.value}. Answer this doubt clearly, step by step, with one quick recap at the end:

${aiPrompt.value.trim() || "Explain the most important concepts I should revise right now."}`;

const renderFallbackQuestions = () => {
  const key = `${aiExam.value}|${aiSubject.value}`;
  const questions = fallbackQuestionBank[key] || [
    "Explain the top 5 high-yield concepts you should revise from this chapter.",
    "Write one conceptual question, one application question, and one trap question from this topic.",
    "What are the most common mistakes students make in this exam area?",
  ];

  renderAiOutput(`
    <h4>Built-in question set for ${escapeHtml(aiExam.value)} · ${escapeHtml(aiSubject.value)}</h4>
    <ul>
      ${questions
        .slice(0, Number(aiCount.value || 5))
        .map((question) => `<li>${escapeHtml(question)}</li>`)
        .join("")}
    </ul>
    <p>The backend AI proxy is not active yet, so this list is coming from the local fallback study bank.</p>
  `);
};

const setupAiLab = async () => {
  if (!aiQuestionForm || !aiOutput) {
    return;
  }

  openAiModelInput.value = getModel();
  await checkServerHealth();

  checkServerStatusButton?.addEventListener("click", checkServerHealth);
  openAiModelInput?.addEventListener("change", () => {
    localStorage.setItem(STORAGE_KEYS.model, openAiModelInput.value.trim() || "gpt-5");
  });

  loadSuggestedPromptButton?.addEventListener("click", () => {
    aiPrompt.value =
      "Suggest high-yield questions from rotational motion and include one trap question students usually miss.";
  });

  aiQuestionForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    renderAiOutput("<p class='ai-output-placeholder'>Generating questions...</p>");
    try {
      const text = await callClaude(buildQuestionPrompt());
      renderAiOutput(`<div>${nl2br(text)}</div>`);
    } catch (error) {
      appState.aiEnabled = false;
      renderFallbackQuestions();
      updateAiStatus(`AI unavailable, using fallback questions. ${error.message}`, true);
    }
  });

  askAiDoubtButton?.addEventListener("click", async () => {
    renderAiOutput("<p class='ai-output-placeholder'>Thinking through your doubt...</p>");
    try {
      const text = await callClaude(buildDoubtPrompt());
      renderAiOutput(`<div>${nl2br(text)}</div>`);
    } catch (error) {
      renderAiOutput(`
        <h4>Backend AI unavailable</h4>
        <p>${escapeHtml(error.message)}</p>
        <p>Set <code>ANTHROPIC_API_KEY</code> in the server environment to enable real AI doubt solving.</p>
      `);
      updateAiStatus(`AI unavailable. ${error.message}`, true);
    }
  });
};

const getSelectedProblem = () =>
  codingProblems.find((problem) => problem.id === appState.selectedProblemId) ||
  codingProblems[0];

const renderProblems = () => {
  problemList.innerHTML = codingProblems
    .map(
      (problem) => `
        <button
          class="problem-item interactive ${problem.id === appState.selectedProblemId ? "active" : ""}"
          type="button"
          data-problem-id="${escapeHtml(problem.id)}"
        >
          <strong>${escapeHtml(problem.title)}</strong>
          <span>${escapeHtml(problem.topic)} · ${escapeHtml(problem.level)}</span>
        </button>
      `
    )
    .join("");
};

const loadProblemIntoEditor = () => {
  const problem = getSelectedProblem();
  problemTitle.textContent = problem.title;
  problemDescription.textContent = problem.description;
  problemTopicChip.textContent = problem.topic;
  problemLevelChip.textContent = problem.level;
  practiceProblemDifficulty.textContent = problem.level;
  codeEditor.value = problem.starterCode;
  testOutput.textContent = "Run the sample tests to validate your solution.";
  testOutput.classList.remove("pass", "fail");
};

const runProblemTests = () => {
  const problem = getSelectedProblem();
  try {
    const runner = new Function(`
      "use strict";
      ${codeEditor.value}
      if (typeof ${problem.functionName} !== "function") {
        throw new Error("Expected function ${problem.functionName} to be defined.");
      }
      return ${problem.functionName};
    `);

    const userFn = runner();
    const results = problem.tests.map((test, index) => {
      const actual = userFn(...test.args);
      const pass = JSON.stringify(actual) === JSON.stringify(test.expected);
      return {
        label: `Test ${index + 1}`,
        pass,
        actual,
        expected: test.expected,
      };
    });

    const passed = results.filter((result) => result.pass).length;
    testOutput.classList.toggle("pass", passed === results.length);
    testOutput.classList.toggle("fail", passed !== results.length);
    testOutput.textContent = [
      `${passed}/${results.length} tests passed`,
      "",
      ...results.map(
        (result) =>
          `${result.pass ? "PASS" : "FAIL"} ${result.label}
expected: ${JSON.stringify(result.expected)}
received: ${JSON.stringify(result.actual)}`
      ),
    ].join("\n");
  } catch (error) {
    testOutput.classList.remove("pass");
    testOutput.classList.add("fail");
    testOutput.textContent = `Execution error\n\n${error.message}`;
  }
};

const setupPracticeArena = () => {
  if (!problemList || !codeEditor) {
    return;
  }

  renderProblems();
  loadProblemIntoEditor();

  problemList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-problem-id]");
    if (!button) {
      return;
    }
    appState.selectedProblemId = button.dataset.problemId;
    renderProblems();
    loadProblemIntoEditor();
  });

  runCodeButton?.addEventListener("click", runProblemTests);
  resetCodeButton?.addEventListener("click", loadProblemIntoEditor);

  explainProblemButton?.addEventListener("click", async () => {
    const problem = getSelectedProblem();
    renderAiOutput("<p class='ai-output-placeholder'>Explaining the selected coding problem...</p>");
    try {
      const text = await callClaude(`Explain this JavaScript coding problem for a student:

Title: ${problem.title}
Topic: ${problem.topic}
Difficulty: ${problem.level}
Description: ${problem.description}

Provide:
1. Intuition
2. Approach
3. Time and space complexity
4. Common mistakes`);
      renderAiOutput(`<div>${nl2br(text)}</div>`);
    } catch (error) {
      renderAiOutput(`
        <h4>${escapeHtml(problem.title)} · Fallback explanation</h4>
        <p>${escapeHtml(problem.description)}</p>
        <p>Write the cleanest function possible for <code>${escapeHtml(problem.functionName)}</code>, then test against the sample cases shown in the runner.</p>
        <p>Reason AI details were unavailable: ${escapeHtml(error.message)}</p>
      `);
    }

    document.querySelector("#ai-lab")?.scrollIntoView({
      behavior: motionQuery.matches ? "auto" : "smooth",
    });
  });
};

setupLoader();
revealSections();
setupHeroTilt();
setupTabs();
setupCursor();
setupScrollButtons();
setupCounters();
setupCountdown();
setupSearch();
setupQuiz();
setupFaq();
setupMobileNav();
setupModal();
setupChat();
setupAiLab();
setupPracticeArena();
filterGroups();
