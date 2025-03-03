document.addEventListener("DOMContentLoaded", () => {
  // Set up code tabs functionality
  setupCodeTabs();

  // Apply syntax highlighting to code examples
  highlightCodeExamples();

  // Promise Chaining Example
  const startChainBtn = document.getElementById("start-chain");
  const resetChainBtn = document.getElementById("reset-chain");
  const chainResult = document.getElementById("chain-result");
  const steps = document.querySelectorAll(".step");

  startChainBtn.addEventListener("click", startPromiseChain);
  resetChainBtn.addEventListener("click", resetChainExample);

  function resetChainExample() {
    steps.forEach((step) => {
      step.classList.remove("processing", "completed", "error");
      step.querySelector(".step-status").textContent = "";
    });
    chainResult.textContent = "";
    startChainBtn.disabled = false;
  }

  function startPromiseChain() {
    resetChainExample();
    startChainBtn.disabled = true;

    // Example: Fetch user -> Fetch posts -> Fetch comments
    chainResult.textContent = "▶️ Starting promise chain...\n";

    // First promise: fetch user
    updateStep(1, "processing", "Processing...");
    fetchUser()
      .then((user) => {
        updateStep(1, "completed", `Completed in ${user.time}ms`);
        chainResult.textContent += `✅ Fetched user: ${user.name} (id: ${user.id})\n`;

        // Second promise: fetch posts
        updateStep(2, "processing", "Processing...");
        return fetchPosts(user.id);
      })
      .then((posts) => {
        updateStep(2, "completed", `Completed in ${posts.time}ms`);
        chainResult.textContent += `✅ Fetched ${posts.count} posts\n`;
        chainResult.textContent += `   Latest post: "${posts.latest.title}"\n`;

        // Third promise: fetch comments
        updateStep(3, "processing", "Processing...");
        return fetchComments(posts.latest.id);
      })
      .then((comments) => {
        updateStep(3, "completed", `Completed in ${comments.time}ms`);
        chainResult.textContent += `✅ Fetched ${comments.count} comments on latest post\n`;
        chainResult.textContent += `   Sample comment: "${comments.sample}"\n\n`;
        chainResult.textContent += "🎉 Promise chain completed successfully!";
        startChainBtn.disabled = false;
      })
      .catch((error) => {
        const failedStep = error.step;
        updateStep(failedStep, "error", "Failed");

        // Mark subsequent steps as not executed
        for (let i = failedStep + 1; i <= 3; i++) {
          updateStep(i, "", "Not executed");
        }

        chainResult.textContent += `❌ Error in step ${failedStep}: ${error.message}\n`;
        chainResult.textContent += "⚠️ Promise chain interrupted";
        startChainBtn.disabled = false;
      });
  }

  function updateStep(stepNumber, status, message) {
    const step = document.getElementById(`step${stepNumber}`);
    step.classList.remove("processing", "completed", "error");
    if (status) {
      step.classList.add(status);
    }
    step.querySelector(".step-status").textContent = message;
  }

  // Simulated API calls for Promise Chaining example
  function fetchUser() {
    return new Promise((resolve, reject) => {
      const time = randomTime(300, 1500);
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 10% chance of failure
          resolve({
            id: "usr_" + Math.floor(Math.random() * 1000),
            name: "John Doe",
            email: "john.doe@example.com",
            time,
          });
        } else {
          reject({
            step: 1,
            message: "Could not authenticate user",
          });
        }
      }, time);
    });
  }

  function fetchPosts(userId) {
    return new Promise((resolve, reject) => {
      const time = randomTime(500, 2000);
      setTimeout(() => {
        if (Math.random() > 0.15) {
          // 15% chance of failure
          resolve({
            count: Math.floor(Math.random() * 10) + 1,
            latest: {
              id: "post_" + Math.floor(Math.random() * 1000),
              title: "Understanding JavaScript Promises",
              content:
                "Promises are a powerful way to handle asynchronous operations...",
            },
            time,
          });
        } else {
          reject({
            step: 2,
            message: `Failed to fetch posts for user ${userId}`,
          });
        }
      }, time);
    });
  }

  function fetchComments(postId) {
    return new Promise((resolve, reject) => {
      const time = randomTime(300, 1200);
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 10% chance of failure
          resolve({
            count: Math.floor(Math.random() * 5) + 1,
            sample: "Great explanation of Promises! Very helpful.",
            time,
          });
        } else {
          reject({
            step: 3,
            message: `Failed to fetch comments for post ${postId}`,
          });
        }
      }, time);
    });
  }

  // Promise.all Example
  const startAllBtn = document.getElementById("start-all");
  const resetAllBtn = document.getElementById("reset-all");
  const allResult = document.getElementById("all-result");
  const tasks = document.querySelectorAll(".task");

  startAllBtn.addEventListener("click", startPromiseAll);
  resetAllBtn.addEventListener("click", resetPromiseAllExample);

  function resetPromiseAllExample() {
    tasks.forEach((task) => {
      task.classList.remove("completed", "error");
      task.querySelector(".progress-bar").style.width = "0";
      task.querySelector(".task-status").textContent = "";
    });
    allResult.textContent = "";
    startAllBtn.disabled = false;
  }

  function startPromiseAll() {
    resetPromiseAllExample();
    startAllBtn.disabled = true;

    allResult.textContent =
      "▶️ Starting parallel requests with Promise.all...\n";

    // Setup simulated API requests
    const weatherPromise = fetchWeather();
    const stockPromise = fetchStockPrice();
    const newsPromise = fetchNewsHeadlines();

    // Track progress animation
    const progressIntervals = [];
    progressIntervals.push(animateProgress("task1", weatherPromise.time));
    progressIntervals.push(animateProgress("task2", stockPromise.time));
    progressIntervals.push(animateProgress("task3", newsPromise.time));

    // Use Promise.all to wait for all promises to resolve
    Promise.all([
      weatherPromise.promise,
      stockPromise.promise,
      newsPromise.promise,
    ])
      .then((results) => {
        // Clear all progress animations
        progressIntervals.forEach((interval) => clearInterval(interval));

        // Mark all tasks as completed
        document.getElementById("task1").classList.add("completed");
        document
          .getElementById("task1")
          .querySelector(".progress-bar").style.width = "100%";
        document
          .getElementById("task1")
          .querySelector(
            ".task-status"
          ).textContent = `${weatherPromise.time}ms`;

        document.getElementById("task2").classList.add("completed");
        document
          .getElementById("task2")
          .querySelector(".progress-bar").style.width = "100%";
        document
          .getElementById("task2")
          .querySelector(".task-status").textContent = `${stockPromise.time}ms`;

        document.getElementById("task3").classList.add("completed");
        document
          .getElementById("task3")
          .querySelector(".progress-bar").style.width = "100%";
        document
          .getElementById("task3")
          .querySelector(".task-status").textContent = `${newsPromise.time}ms`;

        // Display results
        const [weather, stock, news] = results;

        allResult.textContent += `✅ All requests completed successfully!\n\n`;
        allResult.textContent += `Weather: ${weather.condition}, ${weather.temperature}°C\n`;
        allResult.textContent += `Stock: ${stock.symbol} $${stock.price} (${stock.change})\n`;
        allResult.textContent += `News: ${news.headlines.join(
          "\n       "
        )}\n\n`;

        // Show total time (the longest of the three requests)
        const totalTime = Math.max(
          weatherPromise.time,
          stockPromise.time,
          newsPromise.time
        );
        allResult.textContent += `🎉 All data fetched in ${totalTime}ms with Promise.all\n`;
        allResult.textContent += `   (vs. ${
          weatherPromise.time + stockPromise.time + newsPromise.time
        }ms if sequential)`;

        startAllBtn.disabled = false;
      })
      .catch((error) => {
        // Clear all progress animations
        progressIntervals.forEach((interval) => clearInterval(interval));

        // Mark failed task
        const taskElement = document.getElementById(`task${error.taskId}`);
        taskElement.classList.add("error");
        taskElement.querySelector(".task-status").textContent = "Failed";

        // Update result box
        allResult.textContent += `❌ Error in ${error.task}: ${error.message}\n`;
        allResult.textContent += `⚠️ Promise.all aborted - one promise rejected`;

        startAllBtn.disabled = false;
      });
  }

  function animateProgress(taskId, totalTime) {
    const progressBar = document
      .getElementById(taskId)
      .querySelector(".progress-bar");
    let progress = 0;
    const interval = 50; // update every 50ms
    const increment = (interval / totalTime) * 100;

    progressBar.style.width = "0%";

    return setInterval(() => {
      progress += increment;
      if (progress > 95) {
        progress = 95; // Don't reach 100% until actually complete
      }
      progressBar.style.width = `${progress}%`;
    }, interval);
  }

  // Simulated API calls for Promise.all example
  function fetchWeather() {
    const time = randomTime(1000, 3000);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 10% chance of failure
          resolve({
            temperature: Math.floor(Math.random() * 30) + 10,
            condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
              Math.floor(Math.random() * 4)
            ],
          });
        } else {
          reject({
            taskId: 1,
            task: "Weather API",
            message: "Weather service unavailable",
          });
        }
      }, time);
    });

    return { promise, time };
  }

  function fetchStockPrice() {
    const time = randomTime(500, 2500);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 10% chance of failure
          const price = (Math.random() * 100 + 50).toFixed(2);
          const change = (Math.random() * 10 - 5).toFixed(2);
          resolve({
            symbol: "APPL",
            price,
            change: change > 0 ? `+${change}%` : `${change}%`,
          });
        } else {
          reject({
            taskId: 2,
            task: "Stock API",
            message: "Market data temporarily unavailable",
          });
        }
      }, time);
    });

    return { promise, time };
  }

  function fetchNewsHeadlines() {
    const time = randomTime(800, 3500);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 10% chance of failure
          resolve({
            headlines: [
              "JavaScript Promises Now More Popular Than Callbacks",
              "New Framework Promises to Revolutionize Web Development",
              "Developers Embrace Async/Await For Cleaner Code",
            ],
          });
        } else {
          reject({
            taskId: 3,
            task: "News API",
            message: "News service rate limit exceeded",
          });
        }
      }, time);
    });

    return { promise, time };
  }

  // Promise Rejection Example
  const errorScenarioSelect = document.getElementById("error-scenario");
  const startErrorBtn = document.getElementById("start-error");
  const resetErrorBtn = document.getElementById("reset-error");
  const errorResult = document.getElementById("error-result");
  const methodResults = document.querySelectorAll(".method-result");

  startErrorBtn.addEventListener("click", startErrorExample);
  resetErrorBtn.addEventListener("click", resetErrorExample);

  function resetErrorExample() {
    methodResults.forEach((result) => {
      result.textContent = "";
      result.classList.remove("success", "error");
    });
    errorResult.textContent = "";
    startErrorBtn.disabled = false;
  }

  function startErrorExample() {
    resetErrorExample();
    startErrorBtn.disabled = true;

    const scenario = errorScenarioSelect.value;
    errorResult.textContent = `▶️ Testing scenario: ${getScenarioDescription(
      scenario
    )}\n`;

    // Demonstrate two approaches: .catch() and try/catch with async/await
    const catchMethodResult = document.querySelector("#method1 .method-result");
    const tryCatchMethodResult = document.querySelector(
      "#method2 .method-result"
    );

    // Method 1: Using .catch()
    errorResult.textContent += `\n🔄 Running with .catch() method...\n`;

    fetchData(scenario)
      .then((data) => {
        catchMethodResult.textContent = `✅ Success!\n\nData: ${JSON.stringify(
          data,
          null,
          2
        )}`;
        catchMethodResult.classList.add("success");
        errorResult.textContent += `✅ .catch() method handled successfully\n`;
      })
      .catch((error) => {
        catchMethodResult.textContent = `❌ Error caught!\n\nName: ${
          error.name
        }\nMessage: ${error.message}\nStatus: ${error.status || "N/A"}`;
        catchMethodResult.classList.add("error");
        errorResult.textContent += `⚠️ .catch() method caught error: ${error.message}\n`;
      })
      .finally(() => {
        // Method 2: Using try/catch with async/await
        errorResult.textContent += `\n🔄 Running with try/catch method...\n`;

        // Using an immediately-invoked async function expression (IIFE)
        (async function () {
          try {
            const data = await fetchData(scenario);
            tryCatchMethodResult.textContent = `✅ Success!\n\nData: ${JSON.stringify(
              data,
              null,
              2
            )}`;
            tryCatchMethodResult.classList.add("success");
            errorResult.textContent += `✅ try/catch method handled successfully\n`;
          } catch (error) {
            tryCatchMethodResult.textContent = `❌ Error caught!\n\nName: ${
              error.name
            }\nMessage: ${error.message}\nStatus: ${error.status || "N/A"}`;
            tryCatchMethodResult.classList.add("error");
            errorResult.textContent += `⚠️ try/catch method caught error: ${error.message}\n`;
          } finally {
            errorResult.textContent += `\n🎓 Both methods provide similar error handling capabilities!\n`;
            startErrorBtn.disabled = false;
          }
        })();
      });
  }

  function getScenarioDescription(scenario) {
    switch (scenario) {
      case "success":
        return "Successful API call";
      case "network":
        return "Network error (e.g., offline)";
      case "auth":
        return "Authentication error (401)";
      case "server":
        return "Server error (500)";
      default:
        return scenario;
    }
  }

  function fetchData(scenario) {
    return new Promise((resolve, reject) => {
      const delay = randomTime(500, 1500);

      setTimeout(() => {
        switch (scenario) {
          case "success":
            resolve({
              id: 123,
              username: "testuser",
              email: "test@example.com",
              status: "active",
            });
            break;
          case "network":
            reject(new TypeError("Failed to fetch: Network error"));
            break;
          case "auth":
            const authError = new Error("Unauthorized: Invalid API key");
            authError.status = 401;
            authError.name = "AuthenticationError";
            reject(authError);
            break;
          case "server":
            const serverError = new Error("Internal Server Error");
            serverError.status = 500;
            serverError.name = "ServerError";
            reject(serverError);
            break;
          default:
            resolve({ message: "Unknown scenario, defaulting to success" });
        }
      }, delay);
    });
  }

  // Utility function for random time delay
  function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function setupCodeTabs() {
    const codeTabs = document.querySelectorAll(".code-tab");

    codeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Get the parent code example container
        const codeExample = tab.closest(".code-example");

        // Remove active class from all tabs in this container
        codeExample.querySelectorAll(".code-tab").forEach((t) => {
          t.classList.remove("active");
        });

        // Add active class to clicked tab
        tab.classList.add("active");

        // Get the tab content id from the data-tab attribute
        const tabContentId = tab.getAttribute("data-tab");

        // Hide all content tabs in this container
        codeExample.querySelectorAll(".code-content").forEach((content) => {
          content.classList.remove("active");
        });

        // Show the selected content tab
        codeExample.querySelector(`#${tabContentId}`).classList.add("active");

        // Re-apply syntax highlighting to the newly visible code
        highlightCodeExamples();
      });
    });
  }

  function highlightCodeExamples() {
    const codeBlocks = document.querySelectorAll(".code-example code");

    codeBlocks.forEach((codeBlock) => {
      const originalText = codeBlock.textContent;
      let html = originalText;

      // 1. Highlight strings first to avoid interfering with inserted HTML tags later.
      html = html.replace(
        /(['"`])(.*?)(['"`])/g,
        '<span class="string">$1$2$3</span>'
      );

      // 2. Then highlight comments.
      html = html.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');

      // 3. Then highlight keywords.
      const keywords = [
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "async",
        "await",
        "try",
        "catch",
        "finally",
        "new",
        "Promise",
      ];
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b(${keyword})\\b`, "g");
        html = html.replace(regex, '<span class="keyword">$1</span>');
      });

      // 4. Finally, highlight function calls.
      html = html.replace(
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\(/g,
        '<span class="function">$1</span>('
      );

      codeBlock.innerHTML = html;
    });
  }
});
