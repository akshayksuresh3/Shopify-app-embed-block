currentPage = '';
questionSelected = '';
phonenumber = '';
couponCode = '';
apiUrl = 'https://dev-asgard.bobot.in';
clientName = 'Test Bob';
clientId = ''
faq = [{
  "question": "How to place an order",
  "answer": "From store you can place an order"
}]

class MainButton extends HTMLButtonElement {

  constructor() {
    super();
    this.isAnimating = false;
    this.bindedAnimate = this.animate.bind(this);
    this.mainButton = document.getElementById('main-button')
    this.closeButton = document.getElementById('close-button')
    this.page1 = document.getElementById('page1')
    this.faqPage = document.getElementById('faq-page')
    // this.currentPage = ''
    document.getElementById("small-close-button").addEventListener("click", this.hideCard);
    document.getElementById("close-button").addEventListener("click", this.hideCard);
    document.getElementById("faq-card").addEventListener("click", this.showfaqCard)
    document.getElementById("chat-card").addEventListener("click", this.navigateToPage)
    document.getElementById("back-button").addEventListener("click", this.goBackToHome)
    document.getElementById("rewards-card").addEventListener("click", this.showRewardPage)
    document.getElementById("track-order-card").addEventListener("click", this.showTrackOrder)
  }

  // For showing track order page
  showTrackOrder() {
    document.getElementById('page1').style.display = 'none'
    document.getElementById('track-page').style.display = 'block'
    document.getElementById('back-button').style.display = 'inline-block'
    currentPage = 'track-order'
  }

  // For showing rewards page
  showRewardPage() {
    document.getElementById('page1').style.display = 'none'
    document.getElementById('rewards-page').style.display = 'block'
    document.getElementById('back-button').style.display = 'inline-block'
    currentPage = 'rewards-home'
  }

  // For navigating to a whatsapp number on clicking chat
  navigateToPage() {
    console.log(document.getElementById('url-input').value)
    window.open(document.getElementById('url-input').value, '_blank')
  }

  // For showing faq
  showfaqCard() {
    document.getElementById('page1').style.display = 'none'
    document.getElementById('faq-page').style.display = 'block'
    document.getElementById('back-button').style.display = 'inline-block'
    currentPage = 'faq'
  }

  //  On clicking back button on top
  goBackToHome() {
    if (currentPage === 'faq') {
      document.getElementById('page1').style.display = 'block'
      document.getElementById('faq-page').style.display = 'none'
      document.getElementById('back-button').style.display = 'none'
      currentPage = ''
    } else if (currentPage === 'rewards-home') {
      document.getElementById('page1').style.display = 'block'
      document.getElementById('rewards-page').style.display = 'none'
      document.getElementById('back-button').style.display = 'none'
      currentPage = ''
    } else if (currentPage === 'reward-points') {
      document.getElementById('rewards-page1').style.display = 'block';
      document.getElementById('rewards-page2').style.display = 'none'
      currentPage = 'rewards-home'
    } else if (currentPage === 'coupon-page') {
      document.getElementById('rewards-page2').style.display = 'block'
      document.getElementById('rewards-page3').style.display = "none"
      document.getElementById('coupon-code-bob').innerHTML = ''
      currentPage = 'reward-points'
    } else if (currentPage === 'track-order') {
      document.getElementById('page1').style.display = 'block'
      document.getElementById('track-page').style.display = 'none'
      document.getElementById('back-button').style.display = 'none'
      currentPage = ''
    } else if (currentPage === 'order-status') {
      document.getElementById('order-status').style.display = 'none';
      document.getElementById('track-order').style.display = 'block';
      currentPage = 'track-order'
    }
  }

  // To close the details card
  hideCard() {
    let box = document.getElementById('card-box')
    box.style.visibility = 'hidden'
    document.getElementById('main-button').style.visibility = 'visible'
    document.getElementById('close-button').style.visibility = 'hidden'
  }

  connectedCallback() {
    this.addEventListener('click', this.openCard)
    const shopId = document.getElementById('shop-id-bob').innerHTML
    const url = `https://khunom3k9f.execute-api.us-east-2.amazonaws.com/default/Client-Store-App?client_id=${shopId}`
    fetch(url).then(res => {
      return res.json()
    }).then(res => {
      console.log('got response')
      console.log(res);
      apiUrl = res?.Item?.server_url ?? 'https://dev-asgard.bobot.in'
      faq = res?.Item?.faq ?? [
        {
          "question": "How to place an order",
          "answer": "from store"
        }
      ]
    }).catch((err) => {
      console.log(err)
    })
  }

  openCard() {
    this.mainButton.style.visibility = 'hidden'
    this.closeButton.style.visibility = 'visible'
    const div = document.createElement('div');
    const box = document.getElementById('card-box')
    box.style.visibility = 'visible'
    document.body.appendChild(div)
  }
}

class FaqDiv extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('faq injected')
    //     const qa = [{
    //       question: 'How long will it take to deliver my order?', answer: `All orders are dispatched within 48 hours from our warehouse. Please note that orders are not dispatched on Sundays.


    // Once your order is dispatched, we will send you an email and a SMS along with the link to track your order.The delivery timelines are as follows:

    //         Bangalore - 2 - 3 days

    // Other Metro cities - Within 3 - 5 days

    // Rest of India - Within 5 - 7 days` },
    //     {
    //       question: 'How can I track my order?', answer: `You can track your order through the link that's sent to you by the courier company.

    // https://thestateplate.com/pages/track-order` }, { question: 'Can I order from multiple categories or states?', answer: `Yes, you can. All the items in an order will be delivered together.` }, {
    //       question: 'Why are some products out of stock?', answer: `We restock all our products as early as we can.
    // We strive to ensure that all products are in stock at all times but due to sudden surge in demand or some supply issues, they may go out of stock on some occasions. If there is any product visible on our website, that means that sooner or later it will come back in stock.

    // You can subscribe to ' NOTIFY ME ' by entering your email id and we will notify you once its back in stock.` }]
    const qa = faq;
    let test = ''
    qa.forEach((i, index) => {
      document.getElementById('faq-div').innerHTML = document.getElementById('faq-div').innerHTML + `<div id="questionanswer${index + 1}" class="questionanswer">
        <div style="font-weight: 700;cursor: pointer;" id="question${index + 1}" class="question-faq">
            ${i.question}
        </div>
        <div id="answer${index + 1}" style="display: none;" class="answer-faq">
           ${i.answer}
        </div>
    </div>`
      // document.getElementById(`questionanswer${index + 1}`).addEventListener('click', () => {
      //   this.showorhideanswers(`question${index + 1}`, `answer${index + 1}`)
      // })
    })
    var elem = document.getElementsByClassName("question-faq");
    for (var i = 0; i < elem.length; i += 1) {
      (function () {
        // var k = i + 1;
        var boxa = elem[i].id;
        // var boxb = elem[k].parentNode.id;
        elem[i].addEventListener("click", function () {
          console.log('clicked', boxa.slice(-1))
          console.log(questionSelected)
          if (questionSelected) {
            var ans = document.getElementsByClassName('answer-faq')
            for (var i = 0; i < ans.length; i += 1) {
              document.getElementById(ans[i].id).style.display = "none"
            }
          }

          if (questionSelected === boxa) {
            document.getElementById(`answer${boxa.slice(-1)}`).style.display = "none"
            questionSelected = ''
          } else {
            document.getElementById(`answer${boxa.slice(-1)}`).style.display = "block"
            questionSelected = boxa
          }
        }, false);
        // elem[k].addEventListener("click", function () { makeItHappen(boxb, boxa); }, false);
      }()); // immediate invocation
    }
  }
  // showorhideanswers(question, answer) {

  // }

}


class Rewards extends HTMLDivElement {

  constructor() {
    super()

  }

  // Calling reward points api to get the reward points present for a number
  getRewardPoints() {
    let url = document.getElementById('api-url').value
    let number = document.getElementById('phone-input-bob').value
    phonenumber = number;
    if (phonenumber.length < 10 || phonenumber.length > 13) {
      document.getElementById('reward-check-error').style.display = 'block'
      document.getElementById('reward-check-error').innerHTML = 'Enter a valid number'
      setTimeout(() => {
        document.getElementById('reward-check-error').style.display = 'none'
      }, 4000)
      return;
    }
    url = `${url}/referral/balance?phone=${number}`
    document.getElementById('reward-check-button').style.display = 'none'
    document.getElementById('spinner-rewards').style.display = 'inline-block'
    fetch(url).then(response => response.json()).then((response) => {
      console.log(response)
      document.getElementById('reward-check-button').style.display = 'inline-block'
      document.getElementById('spinner-rewards').style.display = 'none'
      document.getElementById('reward-points-number').innerHTML = response?.money.toString() ?? '0'
      if (+response?.money > 0) {
        document.getElementById('reward-points-desc').innerHTML = `<span style="font-weight:700">Nice!!</span> You can now generate a coupon code using available points.`
        document.getElementById('email-input-bob').style.display = 'inline-block'
        document.getElementById('point-input-bob').style.display = 'inline-block'
        document.getElementById('coupon-create-button').style.display = 'inline-block'
      } else {
        document.getElementById('reward-points-desc').innerHTML = `<span style="font-weight:700">Sorry!!</span> You have got no points.`
        document.getElementById('email-input-bob').style.display = 'none'
        document.getElementById('point-input-bob').style.display = 'none'
        document.getElementById('coupon-create-button').style.display = 'none'
      }
      showRewardPoints()
    }).catch((error) => {
      console.log(error)
      document.getElementById('reward-check-button').style.display = 'inline-block'
      document.getElementById('spinner-rewards').style.display = 'none'
      document.getElementById('reward-check-error').style.display = 'block'
      document.getElementById('reward-check-error').innerHTML = 'Something went wrong, please try again'
      setTimeout(() => {
        document.getElementById('reward-check-error').style.display = 'none'
      }, 4000)
      // closePopup();
    })

    // For shoing the reward points retrieved from api
    function showRewardPoints() {
      document.getElementById('rewards-page1').style.display = 'none';
      document.getElementById('rewards-page2').style.display = 'block';
      currentPage = 'reward-points'
    }
  }


  connectedCallback() {
    console.log('reward injected')
    document.getElementById('reward-check-button').addEventListener('click', this.getRewardPoints)
    document.getElementById('coupon-create-button').addEventListener('click', this.getCoupon)
    document.getElementById('copy-clipboard').addEventListener('click', this.copyToClipboard)
  }

  // For copying coupon code to clipboard
  copyToClipboard() {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = couponCode
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    document.getElementById('copy-clipboard').style.display = 'none';
    document.getElementById('check-mark').style.display = 'inline-block'
    setTimeout(() => {
      document.getElementById('copy-clipboard').style.display = 'inline-block';
      document.getElementById('check-mark').style.display = 'none'
    }, 4000)
  }

  // Calling api to get the coupon code
  getCoupon() {
    let url = document.getElementById('api-url').value
    let email = document.getElementById('email-input-bob').value
    let points = document.getElementById('point-input-bob').value
    url = `${url}/discount_code/${phonenumber}`
    const regEx = /^[\w\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g;
    const pointsError = document.getElementById('reward-points-error')
    if (!regEx.test(email)) {
      pointsError.style.display = 'block'
      pointsError.innerHTML = 'Enter a valid email'
      setTimeout(() => {
        pointsError.style.display = 'none'
      }, 4000)
      return;
    }
    if (+points < 1) {
      pointsError.style.display = 'block'
      pointsError.innerHTML = 'Enter valid points'
      setTimeout(() => {
        pointsError.style.display = 'none'
      }, 4000)
      return;
    }
    document.getElementById('coupon-create-button').style.display = 'none';
    document.getElementById('spinner-coupon').style.display = 'inline-block'
    fetch(url, {
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        points: +points ?? 0,
        email: email
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => res.json()).then(data => {
      console.log(data)
      document.getElementById('rewards-page2').style.display = 'none'
      document.getElementById('rewards-page3').style.display = "block"
      couponCode = data?.code ?? ''
      document.getElementById('coupon-code-bob').innerHTML = `<span>${couponCode}</span`
      currentPage = 'coupon-page'
      document.getElementById('coupon-create-button').style.display = 'inline-block';
      document.getElementById('spinner-coupon').style.display = 'none'
    }).catch((err) => {
      document.getElementById('coupon-create-button').style.display = 'inline-block';
      document.getElementById('spinner-coupon').style.display = 'none';
      pointsError.style.display = 'block'
      pointsError.innerHTML = 'Something went wrong, please try again later.'
      setTimeout(() => {
        pointsError.style.display = 'none'
      }, 4000)
    })
  }
}

class TrackOrder extends HTMLDivElement {
  constructor() {
    super()
  }
  connectedCallback() {
    document.getElementById('track-button').addEventListener('click', this.getStatus)
  }

  getStatus() {
    document.getElementById('track-order').style.display = 'none'
    document.getElementById('order-status').style.display = 'block'
    currentPage = 'order-status'
  }
}

customElements.define('main-button', MainButton, { extends: "button" })
customElements.define('faq-div', FaqDiv, { extends: "div" })
customElements.define('rewards-page1', Rewards, { extends: "div" })
customElements.define('track-order', TrackOrder, { extends: "div" })
