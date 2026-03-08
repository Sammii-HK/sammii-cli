import React, { useState } from 'react';
import { Box, Text, Newline, useApp, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import Gradient from 'ink-gradient';
import { bio, about, products, experiments } from './data.js';

const PURPLE = '#a78bfa';
const DIM = '#6b7280';
const CYAN = '#67e8f9';
const PINK = '#f472b6';
const GREEN = '#4ade80';

function Header() {
  return (
    React.createElement(Box, { flexDirection: 'column', marginBottom: 1 },
      React.createElement(Gradient, { name: 'vice' },
        React.createElement(Text, { bold: true },
          `
  ███████╗ █████╗ ███╗   ███╗███╗   ███╗██╗██╗
  ██╔════╝██╔══██╗████╗ ████║████╗ ████║██║██║
  ███████╗███████║██╔████╔██║██╔████╔██║██║██║
  ╚════██║██╔══██║██║╚██╔╝██║██║╚██╔╝██║██║██║
  ███████║██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║██║██║
  ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝╚═╝`
        )
      ),
      React.createElement(Box, { marginLeft: 2, marginTop: 1 },
        React.createElement(Text, { bold: true, color: PURPLE }, bio.title),
        React.createElement(Text, { color: DIM }, `  //  ${bio.location}`)
      )
    )
  );
}

function Links() {
  const links = [
    ['web', bio.web],
    ['github', bio.github],
    ['x', bio.x],
    ['linkedin', bio.linkedin],
  ];
  return (
    React.createElement(Box, { marginLeft: 2, flexDirection: 'row', gap: 2 },
      ...links.map(([label, value]) =>
        React.createElement(Box, { key: label },
          React.createElement(Text, { color: DIM }, `${label} `),
          React.createElement(Text, { color: CYAN, underline: true }, value)
        )
      )
    )
  );
}

function AboutView() {
  return (
    React.createElement(Box, { flexDirection: 'column', marginLeft: 2, marginTop: 1 },
      React.createElement(Text, { color: PURPLE, bold: true }, '  About'),
      React.createElement(Text, { dimColor: true }, '  ' + '─'.repeat(50)),
      React.createElement(Newline, null),
      React.createElement(Box, { marginLeft: 2, width: 70 },
        React.createElement(Text, { wrap: 'wrap' }, about)
      )
    )
  );
}

function ProjectCard({ project, index, color }) {
  return (
    React.createElement(Box, { flexDirection: 'column', marginLeft: 2, marginBottom: 1 },
      React.createElement(Box, null,
        React.createElement(Text, { color, bold: true }, `  ${project.name}`),
        project.url
          ? React.createElement(Text, { color: DIM }, `  ${project.url}`)
          : null
      ),
      React.createElement(Text, { color: DIM, dimColor: true }, `    ${project.tech}`),
      React.createElement(Box, { marginLeft: 4, width: 66 },
        React.createElement(Text, { wrap: 'wrap' }, project.desc)
      )
    )
  );
}

function ProjectsView() {
  return (
    React.createElement(Box, { flexDirection: 'column', marginTop: 1 },
      React.createElement(Box, { marginLeft: 2 },
        React.createElement(Text, { color: PINK, bold: true }, '  Products')
      ),
      React.createElement(Text, { color: DIM, dimColor: true }, '    ' + '─'.repeat(50)),
      ...products.map((p, i) =>
        React.createElement(ProjectCard, { key: p.name, project: p, index: i, color: PINK })
      ),
      React.createElement(Newline, null),
      React.createElement(Box, { marginLeft: 2 },
        React.createElement(Text, { color: GREEN, bold: true }, '  Experiments')
      ),
      React.createElement(Text, { color: DIM, dimColor: true }, '    ' + '─'.repeat(50)),
      ...experiments.map((p, i) =>
        React.createElement(ProjectCard, { key: p.name, project: p, index: i, color: GREEN })
      )
    )
  );
}

const menuItems = [
  { label: 'About', value: 'about' },
  { label: 'Projects', value: 'projects' },
  { label: 'Links', value: 'links' },
  { label: 'Exit', value: 'exit' },
];

export default function App() {
  const { exit } = useApp();
  const [view, setView] = useState('menu');

  useInput((input, key) => {
    if (input === 'q' || (key.escape && view !== 'menu')) {
      if (view === 'menu') {
        exit();
      } else {
        setView('menu');
      }
    }
    if (key.escape && view !== 'menu') {
      setView('menu');
    }
  });

  function handleSelect(item) {
    if (item.value === 'exit') {
      exit();
      return;
    }
    setView(item.value);
  }

  const content = (() => {
    switch (view) {
      case 'about': return React.createElement(AboutView, null);
      case 'projects': return React.createElement(ProjectsView, null);
      case 'links': return React.createElement(Links, null);
      default: return null;
    }
  })();

  return (
    React.createElement(Box, { flexDirection: 'column', paddingTop: 1, paddingBottom: 1 },
      React.createElement(Header, null),
      view === 'menu'
        ? React.createElement(Box, { flexDirection: 'column', marginTop: 1 },
            React.createElement(Box, { marginLeft: 4 },
              React.createElement(SelectInput, {
                items: menuItems,
                onSelect: handleSelect,
                indicatorComponent: ({ isSelected }) =>
                  React.createElement(Text, { color: PURPLE }, isSelected ? '▸ ' : '  '),
                itemComponent: ({ isSelected, label }) =>
                  React.createElement(Text, { color: isSelected ? PURPLE : undefined, bold: isSelected }, label),
              })
            ),
            React.createElement(Box, { marginLeft: 4, marginTop: 1 },
              React.createElement(Text, { color: DIM }, 'Navigate with arrow keys, enter to select')
            )
          )
        : React.createElement(Box, { flexDirection: 'column' },
            content,
            React.createElement(Box, { marginLeft: 4, marginTop: 1 },
              React.createElement(Text, { color: DIM }, 'Press '),
              React.createElement(Text, { color: PURPLE }, 'esc'),
              React.createElement(Text, { color: DIM }, ' to go back, '),
              React.createElement(Text, { color: PURPLE }, 'q'),
              React.createElement(Text, { color: DIM }, ' to quit')
            )
          )
    )
  );
}
