"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Batch = { id: string; students: number };
type Faculty = { name: string };
type Room = { id: string; type: string; capacity: number };
type Subject = {
  batch: string;
  code: string;
  name: string;
  type: string;
  hoursPerWeek: number;
  preferredLabDuration?: number;
  faculty: string;
  students: number;
};

export default function TimetableUI() {
  const [slotsPerDay, setSlotsPerDay] = useState(6);

  const [batches, setBatches] = useState<Batch[]>([{ id: "", students: 60 }]);
  const [faculties, setFaculties] = useState<Faculty[]>([{ name: "" }]);
  const [rooms, setRooms] = useState<Room[]>([
    { id: "", type: "Lecture", capacity: 60 },
  ]);
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      batch: "",
      code: "",
      name: "",
      type: "LEC",
      hoursPerWeek: 3,
      preferredLabDuration: 2,
      faculty: "",
      students: 60,
    },
  ]);

  const [output, setOutput] = useState("");

  // Now timetable stores objects with name, faculty, type per slot
  const [timetable, setTimetable] = useState<
    Record<string, { name: string; faculty: string; type: string }[]> | null
  >(null);

  const addBatch = () => setBatches([...batches, { id: "", students: 60 }]);
  const addFaculty = () => setFaculties([...faculties, { name: "" }]);
  const addRoom = () =>
    setRooms([...rooms, { id: "", type: "Lecture", capacity: 60 }]);
  const addSubject = () =>
    setSubjects([
      ...subjects,
      {
        batch: "",
        code: "",
        name: "",
        type: "LEC",
        hoursPerWeek: 3,
        preferredLabDuration: 2,
        faculty: "",
        students: 60,
      },
    ]);

  const handleSubmit = () => {
    const payload = {
      slotsPerDay,
      batches: batches.filter((b) => b.id.trim() !== ""),
      faculties: faculties.filter((f) => f.name.trim() !== ""),
      rooms: rooms.filter((r) => r.id.trim() !== ""),
      subjects: subjects.filter(
        (s) =>
          s.batch.trim() !== "" &&
          s.code.trim() !== "" &&
          s.name.trim() !== "" &&
          s.faculty.trim() !== ""
      ),
    };

    if (payload.subjects.length === 0) {
      setOutput("Please add at least one valid subject.");
      setTimetable(null);
      return;
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // Build timetable assigning random subjects to slots (object form)
    const newTimetable: Record<
      string,
      { name: string; faculty: string; type: string }[]
    > = {};

    days.forEach((day) => {
      newTimetable[day] = [];
      for (let slot = 0; slot < payload.slotsPerDay; slot++) {
        const randomSubject =
          payload.subjects[
            Math.floor(Math.random() * payload.subjects.length)
          ];
        newTimetable[day].push({
          name: randomSubject.name,
          faculty: randomSubject.faculty,
          type: randomSubject.type,
        });
      }
    });

    setTimetable(newTimetable);
    setOutput(JSON.stringify({ timetable: newTimetable }, null, 2));
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">🕒 Auto Timetable Generator</h2>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Slots per day:</label>
        <select
          className="border rounded px-2 py-1"
          value={slotsPerDay}
          onChange={(e) => setSlotsPerDay(parseInt(e.target.value))}
        >
          <option value={6}>6</option>
          <option value={8}>8</option>
        </select>
      </div>

      {/* Batches */}
      <fieldset className="mb-6 border p-4 rounded">
        <legend className="font-semibold">Batches</legend>
        {batches.map((batch, i) => (
          <div key={i} className="flex gap-4 mt-2">
            <input
              className="border px-2 py-1 rounded"
              placeholder="Batch ID"
              value={batch.id}
              onChange={(e) => {
                const updated = [...batches];
                updated[i].id = e.target.value;
                setBatches(updated);
              }}
            />
            <input
              type="number"
              className="border px-2 py-1 rounded"
              value={batch.students}
              onChange={(e) => {
                const updated = [...batches];
                updated[i].students = parseInt(e.target.value);
                setBatches(updated);
              }}
            />
          </div>
        ))}
        <button
          onClick={addBatch}
          className="mt-2 text-green-600 hover:underline"
          type="button"
        >
          + Add Batch
        </button>
      </fieldset>

      {/* Faculties */}
      <fieldset className="mb-6 border p-4 rounded">
        <legend className="font-semibold">Faculties</legend>
        {faculties.map((faculty, i) => (
          <input
            key={i}
            className="border w-full my-1 px-2 py-1 rounded"
            placeholder="Faculty Name"
            value={faculty.name}
            onChange={(e) => {
              const updated = [...faculties];
              updated[i].name = e.target.value;
              setFaculties(updated);
            }}
          />
        ))}
        <button
          onClick={addFaculty}
          className="mt-2 text-green-600 hover:underline"
          type="button"
        >
          + Add Faculty
        </button>
      </fieldset>

      {/* Rooms */}
      <fieldset className="mb-6 border p-4 rounded">
        <legend className="font-semibold">Rooms</legend>
        {rooms.map((room, i) => (
          <div key={i} className="flex flex-wrap gap-4 mt-2">
            <input
              className="border px-2 py-1 rounded"
              placeholder="Room ID"
              value={room.id}
              onChange={(e) => {
                const updated = [...rooms];
                updated[i].id = e.target.value;
                setRooms(updated);
              }}
            />
            <select
              className="border px-2 py-1 rounded"
              value={room.type}
              onChange={(e) => {
                const updated = [...rooms];
                updated[i].type = e.target.value;
                setRooms(updated);
              }}
            >
              <option value="Lecture">Lecture</option>
              <option value="Lab">Lab</option>
            </select>
            <input
              type="number"
              className="border px-2 py-1 rounded"
              value={room.capacity}
              onChange={(e) => {
                const updated = [...rooms];
                updated[i].capacity = parseInt(e.target.value);
                setRooms(updated);
              }}
            />
          </div>
        ))}
        <button
          onClick={addRoom}
          className="mt-2 text-green-600 hover:underline"
          type="button"
        >
          + Add Room
        </button>
      </fieldset>

      {/* Subjects */}
      <fieldset className="mb-6 border p-4 rounded">
        <legend className="font-semibold">Subjects</legend>
        {subjects.map((subj, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 mt-4">
            <input
              className="border px-2 py-1 rounded"
              placeholder="Batch"
              value={subj.batch}
              onChange={(e) => {
                const updated = [...subjects];
                updated[i].batch = e.target.value;
                setSubjects(updated);
              }}
            />
            <input
              className="border px-2 py-1 rounded"
              placeholder="Code"
              value={subj.code}
              onChange={(e) => {
                const updated = [...subjects];
                updated[i].code = e.target.value;
                setSubjects(updated);
              }}
            />
            <input
              className="border px-2 py-1 rounded"
              placeholder="Name"
              value={subj.name}
              onChange={(e) => {
                const updated = [...subjects];
                updated[i].name = e.target.value;
                setSubjects(updated);
              }}
            />
            <select
              className="border px-2 py-1 rounded"
              value={subj.type}
              onChange={(e) => {
                const updated = [...subjects];
                updated[i].type = e.target.value;
                setSubjects(updated);
              }}
            >
              <option value="LEC">LEC</option>
              <option value="LAB">LAB</option>
            </select>
            <input
              type="number"
              className="border px-2 py-1 rounded"
              placeholder="Hours/Week"
              value={subj.hoursPerWeek}
              onChange={(e) => {
                const updated = [...subjects];
                updated[i].hoursPerWeek = parseInt(e.target.value);
                setSubjects(updated);
              }}
            />
            <input
              type="number"
              className="border px-2 py-1 rounded"
              placeholder="Preferred Lab Duration"
              value={subj.preferredLabDuration ?? ""}
              onChange={(e) => {
                const updated = [...subjects];
                const val = parseInt(e.target.value);
                updated[i].preferredLabDuration = isNaN(val) ? undefined : val;
                setSubjects(updated);
              }}
            />
            <input
              className="border px-2 py-1 rounded"
              placeholder="Faculty"
              value={subj.faculty}
              onChange={(e) => {
                const updated = [...subjects];
                updated[i].faculty = e.target.value;
                setSubjects(updated);
              }}
            />
            <input
              type="number"
              className="border px-2 py-1 rounded"
              placeholder="Students"
              value={subj.students}
              onChange={(e) => {
                const updated = [...subjects];
                updated[i].students = parseInt(e.target.value);
                setSubjects(updated);
              }}
            />
          </div>
        ))}
        <button
          onClick={addSubject}
          className="mt-2 text-green-600 hover:underline"
          type="button"
        >
          + Add Subject
        </button>
      </fieldset>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        type="button"
      >
        🚀 Generate Timetable
      </button>

      {/* Instead of JSON output, render timetable visually */}
      {timetable ? (
        <div className="mt-6 overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-700 w-full text-center text-sm">
            <thead>
              <tr>
                <th className="border border-gray-700 px-2 py-1 bg-gray-800 text-white">
                  Day / Slot
                </th>
                {Array.from({ length: slotsPerDay }).map((_, i) => (
                  <th
                    key={i}
                    className="border border-gray-700 px-2 py-1 bg-gray-800 text-white"
                  >
                    Slot {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(timetable).map(([day, slots]) => (
                <tr key={day} className="odd:bg-gray-900 even:bg-gray-800">
                  <td className="border border-gray-700 px-2 py-1 font-semibold text-yellow-400">
                    {day}
                  </td>
                  {slots.map((subj, i) => (
                    <td
                      key={i}
                      className={`border border-gray-700 px-2 py-1 ${
                        subj.type === "LAB"
                          ? "bg-purple-700 text-white"
                          : "bg-pink-400 text-black"
                      }`}
                    >
                      <div className="font-semibold">{subj.name}</div>
                      <div className="text-xs italic">{subj.faculty}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <pre className="bg-gray-900 p-4 mt-6 rounded overflow-x-auto whitespace-pre-wrap text-white">
          {output}
        </pre>
      )}
    </motion.div>
  );
}
