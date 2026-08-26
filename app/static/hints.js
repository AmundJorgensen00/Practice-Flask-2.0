// Hint widget logic. Generic across all tasks — task names, hint text and
// solutions all come from the JSON block in _hints.html, so this file
// never needs to change when hint content changes.
document.addEventListener("DOMContentLoaded", function () {
  var hintData = JSON.parse(document.getElementById("hint-data").textContent);

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

  function appendHintParagraph(taskKey, hintIndex) {
    var body = document.getElementById("hintBody-" + taskKey);
    var p = document.createElement("p");
    var label = document.createElement("strong");
    label.textContent = "Hint " + (hintIndex + 1) + ": ";
    p.appendChild(label);
    appendFormattedText(p, hintData[taskKey].hints[hintIndex]);
    body.appendChild(p);
  }

  function appendSolution(taskKey) {
    var body = document.getElementById("hintBody-" + taskKey);
    var hr = document.createElement("hr");
    var label = document.createElement("p");
    label.className = "fw-semibold mb-1";
    label.textContent = "Solution";
    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.textContent = hintData[taskKey].solution;
    pre.appendChild(code);
    body.appendChild(hr);
    body.appendChild(label);
    body.appendChild(pre);
  }

  function labelForState(state) {
    if (state.unlocked < 3) {
      return "Show Hint " + (state.unlocked + 1) + "/3";
    }
    return "Show Solution";
  }

  document.querySelectorAll(".hint-show-btn").forEach(function (btn) {
    var taskKey = btn.getAttribute("data-task");

    // Restore whatever was already unlocked in this browser session.
    var state = loadState(taskKey);
    for (var i = 0; i < state.unlocked; i++) {
      appendHintParagraph(taskKey, i);
    }
    if (state.solutionShown) {
      appendSolution(taskKey);
    }
    btn.textContent = labelForState(state);

    btn.addEventListener("click", function () {
      var current = loadState(taskKey);

      if (current.unlocked < 3) {
        appendHintParagraph(taskKey, current.unlocked);
        current.unlocked += 1;
      } else if (!current.solutionShown) {
        appendSolution(taskKey);
        current.solutionShown = true;
      }

      saveState(taskKey, current);
      btn.textContent = labelForState(current);
    });
  });
});
