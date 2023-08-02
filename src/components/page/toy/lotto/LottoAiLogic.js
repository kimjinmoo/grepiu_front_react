import {Container} from "react-bootstrap";

const LottoAiLogic = () => {
  const text = "\n"
      + "        Winning the lottery is a life-changing moment. Get that one good win, and you’re all set. But how to win the lottery? Well, since a magical button is not available, mathematics remains the only tool that can help. So if you want to hit the jackpot, you are lucky because things are looking up.\n"
      + "\n"
      + "      But before I talk about the good news, let’s discuss the bad news first. Once you understand the obstacle that prevents you from winning, it will be easy for you to develop a sensible lotto strategy — one that works.\n"
      + "\n"
      + "      Table of Contents\n"
      + "      The bad news\n"
      + "      The Good News: Use Math to Get the Best Shot Possible\n"
      + "      Choose the Lottery With Better Odds\n"
      + "      Remember that Odds and Probability are Two Different Terms\n"
      + "      Be Thankful That the Lottery is Truly Random\n"
      + "      Play Less Draws to Save Money so You can Buy More Tickets\n"
      + "      Understand your Lottery and its Expected Value\n"
      + "      Make Balanced Odd and Even Numbers in Your Combination\n"
      + "      Make a Balanced Mix of Low and High Numbers in Your Combination\n"
      + "      Use Advanced Combinatorial and Probability Analysis\n"
      + "      Use Lotterycodex – A Lottery Wheel that Uses Combinatorial Math and Probability Theory in One System\n"
      + "      Know When to Skip the Lottery\n"
      + "      Avoid the Improbable\n"
      + "      Don’t Use Statistics to Predict the Outcome of the Lottery Draws\n"
      + "      Don’t Waste Your Money on Silly Lotto Strategies\n"
      + "      Implement a Solid Lottery Game Plan\n"
      + "      How to Win in Each Draw\n"
      + "      Don’t Forget About Your Future\n"
      + "      Tips on How to Win the Lottery\n"
      + "      Commonly Asked Questions About the Lottery\n"
      + "      Add Your Comment Below\n"
      + "      References";

  return <>
    <Container className="mt-5" fluid>
      <h1>현재의 로직</h1>
      <div>참고 : https://lotterycodex.com/how-to-win-the-lottery-mathematically</div>
      <hr/>
      <div>현재 낮은 확률은 제거하고 번호를 추출(1회~현재까지 연산)</div>
      {text.split("\n").map((i,key)=><div key={`text-${key}`}>{i}</div>)}
    </Container>
  </>
}

export default LottoAiLogic;
