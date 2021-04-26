import { expect, use } from "chai";
import { Contract } from "ethers";
import { deployContract, MockProvider, solidity } from "ethereum-waffle";
import EtherSplitter from "../build/EtherSplitter.json";

use(solidity);

describe("Ether Splitter", () => {
  const [alice, bob, charlie, david] = new MockProvider().getWallets();
  let splitter: Contract;

  beforeEach(async () => {
    const contractConstructorArgs: any[] = [bob.address, charlie.address];
    splitter = await deployContract(
      alice,
      EtherSplitter,
      contractConstructorArgs
    );
  });

  it("Deploys correctly and has an address", async () => {
    expect(await splitter.address).to.be.properAddress;
  });

  it("Addres is set correctly", async () => {
    expect(await splitter.firstAddr()).to.equal(bob.address);
    expect(await splitter.secondAddr()).to.equal(charlie.address);
  });

  it("Ether split", async () => {
    const bobBalance = await bob.getBalance();
    const charlieBalance = await charlie.getBalance();
    const aliceBalance = await alice.getBalance();

    const transactionValue: number = 20;

    await splitter.spliter({ value: transactionValue });
    expect(aliceBalance).to.not.equal(await alice.getBalance());

    expect(await bob.getBalance()).to.equal(
      bobBalance.add(transactionValue / 2)
    );
    expect(await charlie.getBalance()).to.equal(
      bobBalance.add(transactionValue / 2)
    );
  });

  it("Ether split - events foundsSplit", async () => {
    await expect(splitter.spliter({ value: 50 }))
      .to.emit(splitter, "foundsSplit")
      .withArgs(bob.address, charlie.address, 25);
  });

  it("Ether split - events remainderReturned", async () => {
    await expect(splitter.spliter({ value: 37 })).to.emit(
      splitter,
      "remainderReturned"
    );
  });
});
