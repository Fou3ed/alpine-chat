import { getTranslationValue } from "../utils/traduction.js";

export const freeBalance = (balance) => {
    const balanceCard = document.querySelector(".balance-card");
    const freeBalanceCard = document.querySelector(".free-balance-card"); // Change the selector here to match the correct element

    if (freeBalanceCard === null) {
        balanceCard.insertAdjacentHTML("afterend", `
        <div class="free-balance-card dark:bg-navy-700">
            <div class="flex justify-between space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z">
                    </path>
                </svg>
                <div class="flex items-center"> <!-- Wrap balance and translation in a flex container -->
                    <p class="free-balance-value text-xl font-semibold text-slate-700 dark:text-navy-100">${balance}</p>
                    <span class="text-slate-700 dark:text-navy-100" data-translation="header.free" style="margin-left: 5px;">${getTranslationValue("header.free")}</span>
                </div>
                <div class="balance-spinner animate-spin hidden"></div>
            </div>
        </div>`);
    }
};
