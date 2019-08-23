
class InquiryService {

  retrieveCallPrompts() {
    return [
      {value: 1, label: "Age and Need for Care"},
      {value: 2, label: "Death of Spouse"},
      {value: 3, label: "Downsizing"},
      {value: 4, label: "Memory Concerns"},
      {value: 5, label: "No Longer able to Care for Loved One at Home"},
      {value: 6, label: "Recent Hospital Visit - Doctor Recommendation"},
      {value: 7, label: "Response to Marketing Material"},
      {value: 8, label: "Relocation"}
    ];
  }

}

export default new InquiryService();
