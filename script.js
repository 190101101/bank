"use strict";

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500.32, 250, -300.92, 5000, -850, -110.18, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2023-10-02T14:43:31.074Z",
    "2023-10-25T11:24:19.761Z",
    "2023-11-15T10:45:23.907Z",
    "2023-01-22T12:17:46.255Z",
    "2023-02-12T15:14:06.486Z",
    "2023-03-09T11:42:26.371Z",
    "2023-05-21T07:43:59.331Z",
    "2023-06-22T15:21:20.814Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
    "2021-03-09T11:42:26.371Z",
    "2021-05-21T07:43:59.331Z",
    "2021-06-22T15:21:20.814Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "EUR",
  locale: "fr-CA",
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2020-10-02T14:43:31.074Z",
    "2020-10-29T11:24:19.761Z",
    "2020-11-15T10:45:23.907Z",
    "2021-01-22T12:17:46.255Z",
    "2021-02-12T15:14:06.486Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseNickname = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const getDaysBetween2Dates = (date1, date2) =>
  Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));

const formatTransactionsDate = (date, locale) => {
  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return "сегодня ";
  if (daysPassed === 1) return "вчера ";
  if (daysPassed <= 5) return `${daysPassed} дня назад`;
  if (daysPassed > 6) return `${daysPassed} дней назад`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = (trans, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(trans);
};

const displayTransactions = (account, sort = false) => {
  containerTransactions.innerHTML = "";

  const transactions = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transactions.forEach((trans, index) => {
    const date = new Date(account.transactionsDates[index]);
    const transdate = formatTransactionsDate(date, account.locale);

    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    const transType = trans > 0 ? "deposit" : "withdrawal";
    const transactionsRow = `<div class="transactions__row"}>
    <div class="transactions__type transactions__type--${transType}">
    ${index + 1} ${transType}
    </div>
    <div class="transactions__date">${transdate}</div>
    <div class="transactions__value">${formattedTrans}$</div>
    </div>`;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionsRow);
  });
};

const createNickNames = (accounts) => {
  accounts.map((account) => {
    account.nickName = account.userName
      .toLowerCase()
      .split(" ")
      .map((item) => item[0])
      .join("");
  });
};

createNickNames(accounts);

const displayBalance = (account) => {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  labelBalance.textContent = `${balance.toFixed(2)}$`;
  account.balance = balance;

  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

const displayTotal = (account) => {
  const depositesTotal = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);

  labelSumIn.textContent = formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  );

  const withdrawalsTotal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((depos) => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + account.interest, 0);

  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

const updateUi = (account) => {
  displayTransactions(account);
  displayBalance(account);
  displayTotal(account);
};

let currentAccount, currentLogOutTimer;

/*
//always logged in
currentAccount = account1;
updateUi(currentAccount);
containerApp.style.opacity = 1;
*/

// display login date
labelDate.textContent = new Intl.DateTimeFormat(navigator.language, {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
}).format(new Date());

//? event handlers
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find((account) => {
    return account.nickName === inputLoginUsername.value;
  });

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
    //display main container
    containerApp.style.opacity = 1;

    // display ui and welcome messaeg
    labelWelcome.textContent = `рады, что вы снова с нами ${
      currentAccount.userName.split(" ")[0]
    }`;

    // display login date
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date());

    // check if the timer exists;
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);

    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const transferAmount = Number(inputTransferAmount.value);
  const recipientNickname = inputTransferTo.value;

  inputTransferAmount.value = "";
  inputTransferTo.value = "";

  inputTransferAmount.blur();
  inputTransferTo.blur();

  const recipientAccout = accounts.find((account) => {
    return account.nickName == recipientNickname;
  });

  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccout &&
    currentAccount.nickName !== recipientAccout.nickName
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccout.transactions.push(transferAmount);

    //add transaction date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccout.transactionsDates.push(new Date().toISOString());

    updateUi(currentAccount);

    // reset the timer
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  }
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputCloseNickname.value == currentAccount.nickName &&
    Number(inputClosePin.value) == currentAccount.pin
  ) {
    const currrentAccountIndex = accounts.findIndex(
      (account) => account.nickName == inputCloseNickname.value
    );

    accounts.splice(currrentAccountIndex, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Войдите в свой аккаунт`;
  }
  inputCloseNickname.value = "";
  inputClosePin.value = "";
  inputCloseNickname.blur();
  inputClosePin.blur();
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanAmount = Math.floor(Number(inputLoanAmount.value));
  const interestCheck = currentAccount.transactions.some(
    (trans) => trans >= (loanAmount * 10) / 100
  );

  console.log("loan... waiting...");

  setTimeout(() => {
    if (loanAmount > 0 && interestCheck) {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUi(currentAccount);
      console.log(`transaction pushed: ${loanAmount}`);
    }
  }, 100);
  
  inputLoanAmount.textContent = "";
  inputLoanAmount.blur();

  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
});

let transactionsSorted = false;

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});

const logoImage = document.querySelector(".logo");
logoImage.addEventListener("click", (e) => {
  const transactionsUi = document.querySelectorAll(".transactions__value");
  const transactionsUiArray = Array.from(transactionsUi, (elem) =>
    parseInt(elem.textContent)
  );

  [...document.querySelectorAll(".transactions__row")].map((row, index) => {
    row.style.backgroundColor = index % 2 == 0 && "#bbd8e3";
  });
});

const startLogoutTimer = () => {
  const logOutTimeCallback = () => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    // в каждом вызове показывать оставшееся время
    labelTimer.textContent = `${minutes}:${seconds}`;

    // после истечения времени остановить таймер и выйти из приложения
    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Войдите в свой аккаунт`;
    }
    time--;
  };

  // установить время выхода через 5 минут
  let time = 300;

  //вызов таймера каждую секунду
  logOutTimeCallback();
  const logOutTimer = setInterval(logOutTimeCallback, 1000);

  return logOutTimer;
};

console.log(accounts);
