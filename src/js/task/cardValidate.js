import { getCard } from "./data";

let data = getCard();

class Task {

    constructor() {
        this.dataPinned = [];
        this.form = document.querySelector('[data-widgets=credit-card-validator]');
        this.data = data;
        this.contactTag = 'span';
        this.imgContainer = document.querySelector('[data-section="main"]')
        this.cardValidatorLabel = document.querySelector('.card-validator__label');
        this.cardValidator = document.querySelector('[data-name=input-number]');
        this.validate = document.querySelector('.card-validator__submit');
        this.mir = document.querySelector('[data-name=mir]');
    }

    testCardValidate(some) {
        if (some === '2') {
            return document.querySelector('[data-name=mir]');
        }
        if (some === '34') {
            return document.querySelector('[data-name=american_express]');
        }
    }
    moonAlgorithm(number) {

        let arr = [];
        number = number.toString();

        for (let i = 0; i < number.length; i++) {
            if (i % 2 === 0) {
                let m = parseInt(number[i]) * 2;
                if (m > 9) {
                    arr.push(m - 9);
                } else {
                    arr.push(m);
                }
            } else {
                let n = parseInt(number[i]);
                arr.push(n)
            }
        }
        let summ = arr.reduce(function(a, b) { return a + b; });
        return Boolean(!(summ % 10));
    }

    clickToValidate() {
        this.validate.addEventListener('click', (e) => {
            if (this.moonAlgorithm(this.cardValidator.value)) {
                this.cardValidatorLabel.classList.remove('card-validator__error')
                this.cardValidatorLabel.classList.add('card-validator__valid')
            } else {
                this.cardValidatorLabel.classList.remove('card-validator__valid')
                this.cardValidatorLabel.classList.add('card-validator__error')
            }
        })
    }

    enterToValidate() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.moonAlgorithm(this.cardValidator.value)) {
                this.cardValidatorLabel.classList.remove('card-validator__error')
                this.cardValidatorLabel.classList.add('card-validator__valid')
            } else {
                this.cardValidatorLabel.classList.remove('card-validator__valid')
                this.cardValidatorLabel.classList.add('card-validator__error')
            }
        })
    }
    imgAction() {
        this.cardValidator.addEventListener('input', (e) => {
            if (this.cardValidator.value === '') {
                this.buildContactList(this.data)
            }
            if (this.cardValidator.value[0] !== '2' && this.cardValidator.value.length === 1) {
                this.buildContactList(this.data)
            }
            if (this.cardValidator.value === '2') {
                document.querySelector('[data-name=mir]').style.opacity = 1;
            }
            if (this.cardValidator.value === '30' || this.cardValidator.value === '36' || this.cardValidator.value === '38') {
                document.querySelector('[data-name=dinners]').style.opacity = 1;
            }
            if (this.cardValidator.value === '31' || this.cardValidator.value === '35') {
                document.querySelector('[data-name=jcb]').style.opacity = 1;
            }
            if (this.cardValidator.value === '34' || this.cardValidator.value === '37') {
                document.querySelector('[data-name=american_express]').style.opacity = 1;
            }
            if (this.cardValidator.value === '4') {
                document.querySelector('[data-name=visa]').style.opacity = 1;
            }
            if (this.cardValidator.value === '50' || this.cardValidator.value === '56' ||
                this.cardValidator.value === '57' || this.cardValidator.value === '58' ||
                this.cardValidator.value === '63' || this.cardValidator.value === '67') {
                document.querySelector('[data-name=maestro]').style.opacity = 1;
            }
            if (this.cardValidator.value === '51' || this.cardValidator.value === '52' ||
                this.cardValidator.value === '53' || this.cardValidator.value === '54' ||
                this.cardValidator.value === '55') {
                document.querySelector('[data-name=mastercard]').style.opacity = 1;
            }
            if (this.cardValidator.value === '60') {
                document.querySelector('[data-name=discover]').style.opacity = 1;
            }
            if (this.cardValidator.value === '62') {
                document.querySelector('[data-name=unionpay]').style.opacity = 1;
            }
        })
    }
    buildContactList(some) {

        this.imgContainer.innerHTML = '';
        some.forEach((o) => {
            const el = document.createElement(this.contactTag);
            el.dataset.contact = '';
            el.dataset.contactId = o.id;
            el.innerHTML = `
            <img class="img-logo" data-name="${o.name}" src="${o.logo}" alt="">
            `
            this.imgContainer.appendChild(el);
        });
    }

    enter() {

        this.buildContactList(this.data);
        this.imgAction();
        this.clickToValidate();
        this.enterToValidate();
    }
}

export { Task }