import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";

const About = () => {
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Ana Sayfa
          </CardTitle>
          <CardBody className="p-4">
            <Row >
              <Col lg="8">
                <h2 className="mt-4">devcourse</h2>
                <h5 className=" mb-4">
                <strong>devcourse</strong>, kullanıcılarına geniş bir yelpazede çeşitli online kursları keşfetme ve satın alma imkanı sunan yenilikçi bir platformdur. Kullanıcılar, istedikleri alanda uzmanlaşmak için zengin içeriğe sahip kursları kolaylıkla bulabilir ve erişebilirler. Ayrıca, platform üzerinden giriş yaparak kişisel hesaplarına erişebilir, satın aldıkları kursları yönetebilir ve gelişimlerini takip edebilirler. <strong>devcourse</strong>, eğitim deneyimini kullanıcılar için etkileyici ve kolaylaştırıcı bir hale getirerek, herkesin kendini geliştirmesine ve yeni yetenekler edinmesine olanak tanır.
              
                </h5>
                <br />
             
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
