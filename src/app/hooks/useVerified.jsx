import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";

export default function useVerified() {
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    async function checkVerified() {
      const id = pb.authStore.model.id;
      const userdata = await pb.collection("users").getOne(id);
      setIsVerified(userdata.verified);
    }
    if (pb.authStore.isValid) checkVerified();
  }, []);

  async function requestVerification() {
    const email = pb.authStore.model.email;
    const res = await pb.collection("users").requestVerification(email);
    if (res) alert("verification email sent! check your inbox");
  }

  return { isVerified, requestVerification };
}
