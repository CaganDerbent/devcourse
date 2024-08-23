import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import usePayment from "../../hooks/usePayment"

const ProjectTables = () => {
  const {
    course,
    total,
    form,
    cardHolderName,
    cardNumber,
    expireMonth,
    expireYear,
    cvc,
    vis,
    message,
    setForm,
    setCardname,
    setCardnumber,
    setMonth,
    setYear,
    setCvc,
    payment,
    deletecourse
  } = usePayment();  

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Sepetim</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Kurslar
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Kurs Adı</th>
                <th>Eğitmen</th>
                <th>Ücret</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {course && course.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img src={tdata.img} alt="avatar" width="200" height="100" />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.title}</h6>
                        <span className="text-muted">{tdata.category}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.author}</td>
                  <td>{tdata.price} TL</td>
                  <td></td>
                  <td><Button color="danger" onClick={() => deletecourse(tdata)}>Kaldır</Button></td>
                </tr>
              ))}
              {course.length === 0 ? (
                <tr className="border-top">
                  <td colSpan="5" className="text-center">Sepetiniz şu anda boş.</td>
                </tr>
              ) : (
                <tr className="border-top">
                  <td></td>
                  <td>Toplam</td>
                  <td>{total} TL</td>
                  <td></td>
                  <td><Button color="success" onClick={() => setForm("block")}>Ödeme Yap</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Alert color="primary" style={{ visibility: vis }}>
        {message}
      </Alert>
      <Card style={{ display: form }}>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">Ödeme Formu</CardTitle>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="cardHolderName">Ad Soyad</Label>
              <Input
                id="cardHolderName"
                value={cardHolderName}
                onChange={(e) => setCardname(e.target.value)}
                placeholder="Ad Soyad"
              />
            </FormGroup>
            <FormGroup>
              <Label for="cardNumber">Kart no</Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardnumber(e.target.value)}
                placeholder="Kart no"
              />
            </FormGroup>
            <FormGroup>
              <Label for="cvc">CVC</Label>
              <Input
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="CVC"
              />
            </FormGroup>
            <FormGroup>
              <Label for="expireMonth">Ay</Label>
              <Input
                id="expireMonth"
                value={expireMonth}
                onChange={(e) => setMonth(e.target.value)}
                type="select"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1}>{i + 1 < 10 ? `0${i + 1}` : i + 1}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="expireYear">Yıl</Label>
              <Input
                id="expireYear"
                value={expireYear}
                onChange={(e) => setYear(e.target.value)}
                type="select"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 2024}>{i + 2024}</option>
                ))}
              </Input>
            </FormGroup>
          </Form>
          <Button color="success" onClick={payment}>Ödemeyi Tamamla</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
