interface SuccessScreenProps {
  onClose: () => void;
}

export default function SuccessScreen({ onClose }: SuccessScreenProps) {
  return (
    <div className="container">
      <h1>Thanks!</h1>
      <p>
        Your reference has been submitted. Your letting agent will be in contact
        soon.
      </p>
      <img
        src={"./success.webp"}
        width={500}
        height={"auto"}
        alt="success"
        className="responsive"
      />
      <section>
        <br />
        <button onClick={onClose}>Go back</button>
      </section>
    </div>
  );
}
