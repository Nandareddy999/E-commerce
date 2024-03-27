import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './accord.css'

const Accordion = () => {
  return (
    <>
    <Container id='acc'>
        <Row>
          <Col>
            <h3 className="pt-5">WHY CHOOSE US:</h3>

            <div class="accordion" id="accordionExample">

              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    EXCEPTIONAL CUSTOMER SERVICE
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Our unparalleled commitment to customer service sets us
                    apart in the e-commerce industry. We prioritize providing
                    exceptional support and guidance to our customers, ensuring
                    their satisfaction every step of the way. From assisting
                    with product selection to offering comprehensive after-sales
                    support, we're dedicated to delivering the best solutions
                    and services to our valued clients.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    ECOMMERCE SPECIALISTS
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    As e-commerce specialists, we possess the expertise and
                    skills needed to excel in the competitive online
                    marketplace. With years of experience, we've honed our
                    capabilities in navigating the complexities of multichannel
                    platforms, cross-channel integration, and e-commerce
                    portals. Trust us to handle the intricacies of your online
                    store with precision and efficiency.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    COMPETITIVE PRICES
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    We understand the importance of maximizing your sales and
                    brand value while maintaining cost-effectiveness. That's why
                    we offer cutting-edge technologies for e-commerce
                    development and online marketing services at highly
                    competitive prices. Our goal is to empower your business to
                    thrive across multiple retail channels without breaking the
                    bank.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    PROVEN TRACK RECORD
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Our portfolio speaks volumes about our expertise and
                    dedication. We take pride in our proven track record of
                    delivering exceptional e-commerce products tailored to our
                    clients' specific requirements.
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container></>
    
    
  )
}

export default Accordion