// Hint widget logic. Generic across all tasks — task names, hint text and
// solutions all come from the JSON block in _hints.html, so this file
// never needs to change when hint content changes.
document.addEventListener("DOMContentLoaded", function () {
  var hintData = JSON.parse(document.getElementById("hint-data").textContent);
  var LANG_KEY = "hintLanguage";

  var toggleBtn = document.getElementById("hint-toggle");
  var panel = document.getElementById("hint-panel");
  toggleBtn.addEventListener("click", function () {
    panel.classList.toggle("d-none");
  });

  document.querySelectorAll(".hint-task-name").forEach(function (nameBtn) {
    nameBtn.addEventListener("click", function () {
      var action = nameBtn.closest(".hint-task").querySelector(".hint-task-action");
      action.classList.toggle("d-none");
    });
  });

  function currentLang() {
    return sessionStorage.getItem(LANG_KEY) || "en";
  }

  function storageKey(taskKey) {
    return "hintProgress:" + taskKey;
  }

  function loadState(taskKey) {
    var raw = sessionStorage.getItem(storageKey(taskKey));
    if (!raw) {
      return { unlocked: 0, solutionShown: false };
    }
    return JSON.parse(raw);
  }

  function saveState(taskKey, state) {
    sessionStorage.setItem(storageKey(taskKey), JSON.stringify(state));
  }

  // Splits text on `backtick` spans and renders those as <code> elements,
  // so inline code/commands in hint text stand out the same way the
  // solution block does — everything else stays as plain text nodes.
  function appendFormattedText(container, text) {
    var parts = text.split(/`([^`]+)`/);
    parts.forEach(function (part, i) {
      if (part === "") {
        return;
      }
      if (i % 2 === 1) {
        var code = document.createElement("code");
        code.textContent = part;
        container.appendChild(code);
      } else {
        container.appendChild(document.createTextNode(part));
      }
    });
  }

  function appendHintParagraph(taskKey, hintIndex, lang) {
    var body = document.getElementById("hintBody-" + taskKey);
    var p = document.createElement("p");
    var label = document.createElement("strong");
    label.textContent = hintData.ui[lang].hintLabel + " " + (hintIndex + 1) + ": ";
    p.appendChild(label);
    appendFormattedText(p, hintData[taskKey].hints[lang][hintIndex]);
    body.appendChild(p);
  }

  function appendSolution(taskKey, lang) {
    var body = document.getElementById("hintBody-" + taskKey);
    var hr = document.createElement("hr");
    var label = document.createElement("p");
    label.className = "fw-semibold mb-1";
    label.textContent = hintData.ui[lang].solutionLabel;
    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.textContent = hintData[taskKey].solution;
    pre.appendChild(code);
    body.appendChild(hr);
    body.appendChild(label);
    body.appendChild(pre);
  }

  function labelForState(state, lang) {
    if (state.unlocked < 3) {
      return hintData.ui[lang].showHint + " " + (state.unlocked + 1) + "/3";
    }
    return hintData.ui[lang].showSolution;
  }

  // Rebuilds every piece of on-page text (panel heading, task names, modal
  // titles, button labels, and already-unlocked hint/solution content) in
  // the given language. Called on load and whenever the toggle is used.
  function applyLanguage(lang) {
    document.getElementById("hint-panel-heading").textContent = hintData.ui[lang].panelHeading;

    document.querySelectorAll(".hint-lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("btn-secondary", active);
      btn.classList.toggle("btn-outline-secondary", !active);
    });

    document.querySelectorAll(".hint-task").forEach(function (taskEl) {
      var taskKey = taskEl.getAttribute("data-task");
      taskEl.querySelector(".hint-task-name").textContent = hintData[taskKey].name[lang];

      var title = document.getElementById("hintModalTitle-" + taskKey);
      if (title) {
        title.textContent = hintData[taskKey].name[lang];
      }

      var body = document.getElementById("hintBody-" + taskKey);
      body.innerHTML = "";
      var state = loadState(taskKey);
      for (var i = 0; i < state.unlocked; i++) {
        appendHintParagraph(taskKey, i, lang);
      }
      if (state.solutionShown) {
        appendSolution(taskKey, lang);
      }

      setButtonLabels(taskKey, labelForState(state, lang));
    });
  }

  // A task's unlock button appears twice (panel + modal footer, see the
  // comment in _hints.html) — keep both copies showing the same label.
  function setButtonLabels(taskKey, label) {
    document.querySelectorAll('.hint-unlock-btn[data-task="' + taskKey + '"]').forEach(function (btn) {
      btn.textContent = label;
    });
  }

  document.querySelectorAll(".hint-lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      sessionStorage.setItem(LANG_KEY, lang);
      applyLanguage(lang);
    });
  });

  document.querySelectorAll(".hint-unlock-btn").forEach(function (btn) {
    var taskKey = btn.getAttribute("data-task");

    btn.addEventListener("click", function () {
      var lang = currentLang();
      var current = loadState(taskKey);

      if (current.unlocked < 3) {
        appendHintParagraph(taskKey, current.unlocked, lang);
        current.unlocked += 1;
      } else if (!current.solutionShown) {
        appendSolution(taskKey, lang);
        current.solutionShown = true;
      }

      saveState(taskKey, current);
      setButtonLabels(taskKey, labelForState(current, lang));
    });
  });

  // Restore whatever was already unlocked in this browser session, in
  // whichever language was last selected.
  applyLanguage(currentLang());
});
