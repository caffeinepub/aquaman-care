import Text "mo:core/Text";
import List "mo:core/List";

actor {
  type Submission = {
    name : Text;
    email : Text;
    message : Text;
  };

  let submissions = List.empty<Submission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let newSubmission : Submission = {
      name;
      email;
      message;
    };
    submissions.add(newSubmission);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.toArray();
  };
};
