import { Switch } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/Index";
import Footer from "../../components/Footer/Index";
import Header from "../../components/Header/Index";
import SubscriberService from "../../services/SubscriberService";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Index() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createSubscriber({
      name: fullName,
      email,
    });
  };

  const createSubscriber = async (params) => {
    try {
      const res = await SubscriberService.create(params);
      setResMessage(res.message);

      setFullName("");
      setEmail("");
      setAgreed("");

      setServerError("");
    } catch (error) {
      setServerError("Something went wrong! please try again later!");
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <BreadCrumb
        items={[
          { id: 1, name: "Home" },
          { id: 2, name: "Subscribe" },
        ]}
      />
      <div className="isolate bg-white px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Subscribe our products update
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Provide these details so that we can send email notification when
            there are any product updates.
          </p>
        </div>
        {resMessage && (
          <p className="text-green-500 font-bold text-center">
            Successfully Submitted.
          </p>
        )}
        {serverError && (
          <p className="text-red-500 font-bold text-center">{serverError}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? "bg-indigo-600" : "bg-gray-200",
                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <Link href="/" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </Link>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={!agreed}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Let's Go
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </Fragment>
  );
}
