import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <section id="footer">
      <div class="container">
        <div class="row">
          <div class="span1">
            <div id="small-logo">
              <img src="img/small-logo.png" />
            </div>
          </div>
          <div class="span2">
            <div class="footer-list">
              <h6>OUR BOXES</h6>
              <ul>
                <a href="#">
                  <li>Classic Box</li>
                </a>
                <a href="#">
                  <li>Vegetarian Box</li>
                </a>
                <a href="#">
                  <li>Family Box</li>
                </a>
                <a href="#">
                  <li>Dinner Party Box</li>
                </a>
                <a href="#">
                  <li>Gift Box</li>
                </a>
              </ul>
            </div>
          </div>
          <div class="span2">
            <div class="footer-list">
              <h6>OUR RECIPES</h6>
              <ul>
                <a href="#">
                  <li>Last Weeks Feature</li>
                </a>
                <a href="#">
                  <li>Next Weeks Feature</li>
                </a>
              </ul>
            </div>
          </div>
          <div class="span2">
            <div class="footer-list">
              <h6>ABOUT US</h6>
              <ul>
                <a href="#">
                  <li>The Food</li>
                </a>
                <a href="#">
                  <li>How We Sourcex</li>
                </a>
                <a href="#">
                  <li>Sustainability</li>
                </a>
                <li>
                  <a href="about.html">About Us</a>
                </li>
                <a href="#">
                  <li>Contact Us</li>
                </a>
              </ul>
            </div>
          </div>
          <div class="span5">
            <div id="twitter">
              <img
                src="img/twitter-logo.png"
                alt=""
                title=""
                height="50"
                width="50"
                class="twitter-logo"
              />
              <div class="tweet-bg">
                <div class="tweets">
                  <p>@chefallanp that's just not on really</p>
                </div>
                <div id="follow-btn">
                  <img src="img/follow-us.jpg" />
                </div>
              </div>
            </div>
            <div class="checkout-options">
              <h6>SECURE CHECKOUT</h6>
              <ul>
                <li>
                  <img src="img/solo-logo.png" />
                </li>
                <li>
                  <img src="img/switch-logo.png" />
                </li>
                <li>
                  <img src="img/maestro-logo.png" />
                </li>
                <li>
                  <img src="img/visa-logo.png" />
                </li>
                <a href="#">
                  <li>
                    <img src="img/facebook-logo.png" />
                  </li>
                </a>
                <a href="#">
                  <li>
                    <img src="img/twitter-logo-flat.png" />
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="copyright-bar">
        <div class="container">
          <div class="row">
            <div class="copyright-content">
              <div class="span4">
                <p>The Naked Radish Limited. 2013 All rights reserved.</p>
              </div>
              <div class="span4 offset4">
                <div class="copyright-list">
                  <ul>
                    <a href="terms.html">
                      <li>Terms & Conditions</li>
                    </a>
                    <a href="privacy.html">
                      <li> - Privacy Policy</li>
                    </a>
                    <a href="#">
                      <li> - Cookie Policy</li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
