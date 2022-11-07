/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  YourContract,
  YourContractInterface,
} from "../../contracts/YourContract";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "purpose",
        type: "string",
      },
    ],
    name: "SetPurpose",
    type: "event",
  },
  {
    inputs: [],
    name: "purpose",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newPurpose",
        type: "string",
      },
    ],
    name: "setPurpose",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c0604052601c60808190527f4275696c64696e6720556e73746f707061626c6520417070732121210000000060a090815261003e9160009190610051565b5034801561004b57600080fd5b50610125565b82805461005d906100ea565b90600052602060002090601f01602090048101928261007f57600085556100c5565b82601f1061009857805160ff19168380011785556100c5565b828001600101855582156100c5579182015b828111156100c55782518255916020019190600101906100aa565b506100d19291506100d5565b5090565b5b808211156100d157600081556001016100d6565b600181811c908216806100fe57607f821691505b6020821081141561011f57634e487b7160e01b600052602260045260246000fd5b50919050565b6105a5806101346000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806370740aab1461003b578063eb68757f14610059575b600080fd5b61004361006e565b604051610050919061035b565b60405180910390f35b61006c61006736600461038b565b6100fc565b005b6000805461007b9061043c565b80601f01602080910402602001604051908101604052809291908181526020018280546100a79061043c565b80156100f45780601f106100c9576101008083540402835291602001916100f4565b820191906000526020600020905b8154815290600101906020018083116100d757829003601f168201915b505050505081565b805161010f906000906020840190610275565b506101cb336040518060400160405280600e81526020016d73657420707572706f736520746f60901b815250600080546101489061043c565b80601f01602080910402602001604051908101604052809291908181526020018280546101749061043c565b80156101c15780601f10610196576101008083540402835291602001916101c1565b820191906000526020600020905b8154815290600101906020018083116101a457829003601f168201915b5050505050610208565b7f6ea5d6383a120235c7728a9a6751672a8ac068e4ed34dcca2ee444182c1812de3360006040516101fd929190610477565b60405180910390a150565b61024f83838360405160240161022093929190610531565b60408051601f198184030181529190526020810180516001600160e01b031663fb77226560e01b179052610254565b505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b8280546102819061043c565b90600052602060002090601f0160209004810192826102a357600085556102e9565b82601f106102bc57805160ff19168380011785556102e9565b828001600101855582156102e9579182015b828111156102e95782518255916020019190600101906102ce565b506102f59291506102f9565b5090565b5b808211156102f557600081556001016102fa565b6000815180845260005b8181101561033457602081850181015186830182015201610318565b81811115610346576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061036e602083018461030e565b9392505050565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561039d57600080fd5b813567ffffffffffffffff808211156103b557600080fd5b818401915084601f8301126103c957600080fd5b8135818111156103db576103db610375565b604051601f8201601f19908116603f0116810190838211818310171561040357610403610375565b8160405282815287602084870101111561041c57600080fd5b826020860160208301376000928101602001929092525095945050505050565b600181811c9082168061045057607f821691505b6020821081141561047157634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b0383168152600060206040818401526000845481600182811c9150808316806104a857607f831692505b8583108114156104c657634e487b7160e01b85526022600452602485fd5b60408801839052606088018180156104e557600181146104f657610521565b60ff19861682528782019650610521565b60008b81526020902060005b8681101561051b57815484820152908501908901610502565b83019750505b50949a9950505050505050505050565b6001600160a01b0384168152606060208201526000610553606083018561030e565b8281036040840152610565818561030e565b969550505050505056fea26469706673582212208f039a120d9d841371a0291df44d6b28346ee8db791984e15c5ea1cb102e411364736f6c634300080a0033";

type YourContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YourContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YourContract__factory extends ContractFactory {
  constructor(...args: YourContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "YourContract";
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<YourContract> {
    return super.deploy(overrides || {}) as Promise<YourContract>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): YourContract {
    return super.attach(address) as YourContract;
  }
  override connect(signer: Signer): YourContract__factory {
    return super.connect(signer) as YourContract__factory;
  }
  static readonly contractName: "YourContract";

  public readonly contractName: "YourContract";

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YourContractInterface {
    return new utils.Interface(_abi) as YourContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): YourContract {
    return new Contract(address, _abi, signerOrProvider) as YourContract;
  }
}
