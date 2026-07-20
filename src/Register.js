import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
function Register() {
  const [RecordCount, setRecordCount] = useState(0);
  const [TitleCount, setTitleCount] = useState(0);
  const [RoundCount, setRoundCount] = useState(0);
  const [HomeId, setHomeId] = useState(0);
  const [AwayId, setAwayId] = useState(0);
  const [show, setShow] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const handleShow = () => {
    setShow(true);
  };
  const navigate = useNavigate();
  const onRecordChange = (event) => {
    setRecordCount(event.target.value.length);
  };
  const onTitleChange = (event) => {
    setTitleCount(event.target.value.length);
  };
  const onRoundCount = (event) => {
    if (event.target.value === "default") {
      setRoundCount("default");
    } else {
      setRoundCount(parseInt(event.target.value, 10));
    }
  };
  const onHomeId = (event) => {
    if (event.target.value === "default") {
      setHomeId("default");
    } else {
      setHomeId(parseInt(event.target.value, 10));
    }
  };
  const onAwayId = (event) => {
    if (event.target.value === "default") {
      setAwayId("default");
    } else {
      setAwayId(parseInt(event.target.value, 10));
    }
  };
  const changeFile = (event) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };
  const [target_file, setFile] = useState(null);
  useEffect(() => {
    if (RecordCount && TitleCount && RoundCount && HomeId && AwayId) {
      console.log("ボタンを活性化");
      setdisabled(false);
    } else {
      console.log("ボタンを非活性");
      setdisabled(true);
    }
  }, [RecordCount, TitleCount, RoundCount, HomeId, AwayId]);
  return (
    <main>
      <div className="content-list">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <div
          className="record-list"
          style={{
            textAlign: "center",
            width: "100%",
            marginBottom: "5%",
            height: "70vh",
          }}
        >
          <div>
            <label>Title</label>
            <div>
              <input onChange={onTitleChange} maxLength="20"></input>
            </div>
            {TitleCount}/20
          </div>
          <div>
            <label>Round</label>
            <div>
              <select className="w-5" onChange={onRoundCount}>
                <option value="default">--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
              </select>
            </div>
          </div>
          <div>
            <label>Card</label>
            <div>
              <select onChange={onHomeId}>
                <option value="default">--HomeTeamを選択してください--</option>
                <option value="1">アビスパ福岡</option>
                <option value="2">セレッソ大阪</option>
                <option value="3">ファジアーノ岡山</option>
                <option value="4">FC東京</option>
                <option value="5">ガンバ大阪</option>
                <option value="6">ジェフユナイテッド千葉</option>
                <option value="7">鹿島アントラーズ</option>
                <option value="8">柏レイソル</option>
                <option value="9">川崎フロンターレ</option>
                <option value="10">京都サンガ</option>
                <option value="11">町田ゼルビア</option>
                <option value="12">水戸ホーリーホック</option>
                <option value="13">名古屋グランパス</option>
                <option value="14">サンフレッチェ広島</option>
                <option value="15">清水エスパルス</option>
                <option value="16">東京ヴェルディ</option>
                <option value="17">浦和レッズ</option>
                <option value="18">V・ファーレン長崎</option>
                <option value="19">ヴィッセル神戸</option>
                <option value="20">横浜Fマリノス</option>
                <option value="21">アルビレックス新潟</option>
                <option value="22">ブラウリッツ秋田</option>
                <option value="23">コンサドーレ札幌</option>
                <option value="24">藤枝MYFC</option>
                <option value="25">今治FC</option>
                <option value="26">いわきFC</option>
                <option value="27">ジュビロ磐田</option>
                <option value="28">カターレ富山</option>
                <option value="29">モンテディオ山形</option>
                <option value="30">大分トリニータ</option>
                <option value="31">RB大宮アルティージャ</option>
                <option value="32">サガン鳥栖</option>
                <option value="33">湘南ベルマーレ</option>
                <option value="34">テゲバジャーロ宮崎</option>
                <option value="35">栃木シティ</option>
                <option value="36">徳島ヴォルティス</option>
                <option value="37">ヴァンラーレ八戸</option>
                <option value="38">べガルダ仙台</option>
                <option value="39">ヴァンフォーレ甲府</option>
                <option value="40">横浜FC</option>
                <option value="41">愛媛FC</option>
                <option value="42">FC岐阜</option>
                <option value="43">FC琉球</option>
                <option value="44">福島ユナイテッドFC</option>
                <option value="45">ガイナーレ鳥取</option>
                <option value="46">鹿児島ユナイテッド</option>
                <option value="47">カマタマーレ讃岐</option>
                <option value="48">ツエーゲン金沢</option>
                <option value="49">ギラヴァンツ北九州</option>
                <option value="50">高知ユナイテッドSC</option>
                <option value="51">松本山雅FC</option>
                <option value="52">奈良クラブ</option>
                <option value="53">FC大阪</option>
                <option value="54">AC長野パルセイロ</option>
                <option value="55">レノファ山口FC</option>
                <option value="56">ロアッソ熊本</option>
                <option value="57">SC相模原</option>
                <option value="58">ザスパ群馬</option>
                <option value="59">栃木SC</option>
                <option value="60">レイラック滋賀FC</option>
              </select>
            </div>
            VS
            <div>
              <select onChange={onAwayId}>
                <option value="default">--AwayTeamを選択してください--</option>
                <option value="1">アビスパ福岡</option>
                <option value="2">セレッソ大阪</option>
                <option value="3">ファジアーノ岡山</option>
                <option value="4">FC東京</option>
                <option value="5">ガンバ大阪</option>
                <option value="6">ジェフユナイテッド千葉</option>
                <option value="7">鹿島アントラーズ</option>
                <option value="8">柏レイソル</option>
                <option value="9">川崎フロンターレ</option>
                <option value="10">京都サンガ</option>
                <option value="11">町田ゼルビア</option>
                <option value="12">水戸ホーリーホック</option>
                <option value="13">名古屋グランパス</option>
                <option value="14">サンフレッチェ広島</option>
                <option value="15">清水エスパルス</option>
                <option value="16">東京ヴェルディ</option>
                <option value="17">浦和レッズ</option>
                <option value="18">V・ファーレン長崎</option>
                <option value="19">ヴィッセル神戸</option>
                <option value="20">横浜Fマリノス</option>
                <option value="21">アルビレックス新潟</option>
                <option value="22">ブラウリッツ秋田</option>
                <option value="23">コンサドーレ札幌</option>
                <option value="24">藤枝MYFC</option>
                <option value="25">今治FC</option>
                <option value="26">いわきFC</option>
                <option value="27">ジュビロ磐田</option>
                <option value="28">カターレ富山</option>
                <option value="29">モンテディオ山形</option>
                <option value="30">大分トリニータ</option>
                <option value="31">RB大宮アルティージャ</option>
                <option value="32">サガン鳥栖</option>
                <option value="33">湘南ベルマーレ</option>
                <option value="34">テゲバジャーロ宮崎</option>
                <option value="35">栃木シティ</option>
                <option value="36">徳島ヴォルティス</option>
                <option value="37">ヴァンラーレ八戸</option>
                <option value="38">べガルダ仙台</option>
                <option value="39">ヴァンフォーレ甲府</option>
                <option value="40">横浜FC</option>
                <option value="41">愛媛FC</option>
                <option value="42">FC岐阜</option>
                <option value="43">FC琉球</option>
                <option value="44">福島ユナイテッドFC</option>
                <option value="45">ガイナーレ鳥取</option>
                <option value="46">鹿児島ユナイテッド</option>
                <option value="47">カマタマーレ讃岐</option>
                <option value="48">ツエーゲン金沢</option>
                <option value="49">ギラヴァンツ北九州</option>
                <option value="50">高知ユナイテッドSC</option>
                <option value="51">松本山雅FC</option>
                <option value="52">奈良クラブ</option>
                <option value="53">FC大阪</option>
                <option value="54">AC長野パルセイロ</option>
                <option value="55">レノファ山口FC</option>
                <option value="56">ロアッソ熊本</option>
                <option value="57">SC相模原</option>
                <option value="58">ザスパ群馬</option>
                <option value="59">栃木SC</option>
                <option value="60">レイラック滋賀FC</option>
              </select>
            </div>
          </div>
          <div>
            <label>Score</label>
            <div>
              <select>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
              VS
              <select>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Record</label>
            <div>
              <Form.Control
                as="textarea"
                onChange={onRecordChange}
                style={{ width: "80%", margin: "auto", height: "20vh" }}
                maxLength="1000"
              />
              {RecordCount}/1000
            </div>
          </div>
          <Button
            onClick={handleShow}
            disabled={disabled}
            style={{ marginTop: "10px" }}
          >
            投稿
          </Button>
        </div>
      </div>
      <Modal show={show} centered={true}>
        <Modal.Header>
          <Modal.Title>画像投稿</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="file">
              <Form.Label>
                drop some files here ,or click to select files
              </Form.Label>
              <Form.Control
                type="file"
                onChange={changeFile}
                style={{ marginBottom: "10px" }}
              />
              <img width="100%" src={target_file} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate(`/`)}>
            Skip
          </Button>
          <Button variant="primary" onClick={() => navigate(`/`)}>
            Save Image
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
export default Register;
