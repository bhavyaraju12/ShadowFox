document.addEventListener('DOMContentLoaded', () => {
  const polls = document.querySelectorAll('.poll-card');
  
  polls.forEach(poll => {
    const options = poll.querySelectorAll('input[type="radio"]');
    const progressBars = poll.querySelectorAll('.progress');
    const percentages = poll.querySelectorAll('.vote-percentage');
    const totalVotesSpan = poll.querySelector('.total-votes span');
    let totalVotes = 0;
    const votes = new Map();
    
    options.forEach((option, index) => {
      votes.set(option.value, 0);
      
      option.addEventListener('change', () => {
        if (option.checked) {
          votes.set(option.value, votes.get(option.value) + 1);
          totalVotes++;
          updateUI();
        }
      });
    });
    
    function updateUI() {
      votes.forEach((voteCount, optionValue) => {
        const index = Array.from(options).findIndex(opt => opt.value === optionValue);
        const percentage = totalVotes === 0 ? 0 : (voteCount / totalVotes) * 100;
        
        progressBars[index].style.width = `${percentage}%`;
        percentages[index].textContent = `${percentage.toFixed(1)}%`;
      });
      
      totalVotesSpan.textContent = totalVotes;
    }
  });
});