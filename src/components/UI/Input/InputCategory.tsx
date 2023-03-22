interface IInputCategory {
  ckecked: boolean;
  categoryName: string;
  handleSetCategory: () => void;
}

const InputCategory = ({ ckecked, categoryName, handleSetCategory }: IInputCategory) => {
  return (
    <div  className="category__item">
      <label>
        <input onChange={handleSetCategory} type="checkbox" name="" checked={ckecked} />
        <span>{categoryName}</span>
      </label>
    </div>
  );
};

export default InputCategory;
