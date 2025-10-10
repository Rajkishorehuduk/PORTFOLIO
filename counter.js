const CounterButton = () => {
  const [count, setCount] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setCount(count + 1);
    setTimeout(() => setIsAnimating(false), 150);
  };
  return React.createElement('div', null,
    React.createElement('h1', null, 'Simple Click Counter'),
    React.createElement('p', null, `You clicked the button ${count} times.`),
    React.createElement('button', { onClick: handleClick, className: `btn btn-primary ${isAnimating ? 'animate-click' : ''}` }, 'Click Me!')
  );
};

ReactDOM.createRoot(document.getElementById('counter-demo')).render(React.createElement(CounterButton));
